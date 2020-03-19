const mongoose = require('mongoose')
const slug = require('slug')
const Post = mongoose.model('Post')

exports.index = (req, res) => {
    res.render('postAdd')
}

exports.add = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(item => slug(item.trim(), { lower: true }))
    req.body.author = req.user._id
    const preparePost = new Post(req.body)
    try {
        await preparePost.save()
    } catch (error) {
        req.flash('error', `Error: ${error}`)
        return res.redirect('/post/add')
    }
    req.flash('success', 'Saved successfully')
    res.redirect('/post/add')
}

exports.edit = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug })
    res.render('postEdit', { post })
}

exports.editAction = async (req, res) => {
    req.body.slug = slug(req.body.title, { lower: true })
    req.body.tags = req.body.tags.split(',').map(item => slug(item.trim(), { lower: true }))
    try {
        const post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
    } catch (error) {
        req.flash('error', `Error: ${error}`)
        return res.redirect('/')
    }
    req.flash('success', 'Post updated')
    res.redirect('/')
}