exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Você não têm autorização para acessar essa página')
        res.redirect('/login')
        return
    }
    next()
}

exports.changePassword = (req, res) => {
    if (req.body.password !== req.body['password-confirm']) {
        req.flash('error', 'Confirmação de nova senha não estão iguais')
        res.redirect('/profile')
        return
    }

    req.user.setPassword(req.body.password, async () => {
        await req.user.save()
        req.flash('success', 'Senha alterada com sucesso')
        res.redirect('/profile')
    })
}