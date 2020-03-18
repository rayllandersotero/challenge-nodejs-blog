const User = require('../models/User')
const crypto = require('crypto')
const mailHandler = require('../handlers/mailHandler')

exports.login = (req, res) => {
    res.render('login')
}

exports.loginAction = (req, res) => {
    const auth = User.authenticate()
    auth(req.body.email, req.body.password, (error, result) => {
        if (!result) {
            req.flash('error', 'Falha ao logar')
            res.redirect('/login')
            return
        }
        req.login(result, () => { })
        req.flash('success', 'Logado com sucesso')
        res.redirect('/')
    })
}

exports.register = (req, res) => {
    res.render('register')
}

exports.registerAction = (req, res) => {
    const newUser = new User(req.body)
    User.register(newUser, req.body.password, error => {
        if (error) {
            req.flash('eroor', `Erro ao se cadastrar: ${error}`)
            res.redirect('/register')
            return
        }
        req.flash('success', 'Usuário cadastrado com sucesso')
        res.redirect('/login')
    })
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

exports.profile = (req, res) => {
    res.render('profile')
}

exports.profileAction = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }
        )
    } catch (error) {
        req.flash('error', `Erro: ${error.messege}`)
    }
    req.flash('success', 'Dados atualizados')
    res.redirect('/profile')
    return
}

exports.forget = (req, res) => {
    res.render('forget')
}

exports.forgetAction = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec()
    if (!user) {
        req.flash('error', 'Email não encontrado')
        res.redirect('/login/forget')
        return
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordTokenExpiration = Date.now() + 3600000 // 1h

    await user.save()

    let resetLink = `http://${req.headers.host}/login/forget/${user.resetPasswordToken}`
    let userMail = `${user.name} <${user.email}>`
    let htmlMail = `Testando email link:<br><a href="${resetLink}">Resetar senha</a>`
    let textMail = `Testando email link: ${resetLink}`

    mailHandler.send({
        to: userMail,
        subject: 'Resetar senha',
        html: htmlMail,
        text: textMail
    })

    req.flash('success', 'Te enviamos um email com instruções')
    res.redirect('/login')
}

exports.forgetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpiration: { $gt: Date.now() }
    }).exec()

    if (!user) {
        req.flash('error', 'Esse link expirou, faça uma nova requisição')
        res.redirect('/login/forget')
        return
    }

    req.flash('info', 'Digite sua nova senha')
    res.render('reset-password')
}

exports.forgetTokenAction = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpiration: { $gt: Date.now() }
    }).exec()

    if (!user) {
        req.flash('error', 'Esse link expirou, faça uma nova requisição')
        res.redirect('/login/forget')
        return
    }

    if (req.body.password !== req.body['password-confirm']) {
        req.flash('error', 'Confirmação de nova senha não estão iguais')
        res.redirect('back')
        return
    }

    user.setPassword(req.body.password, async () => {
        await user.save()
        req.flash('success', 'Senha alterada com sucesso')
        res.redirect('/')
    })
}