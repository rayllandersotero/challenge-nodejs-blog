const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async (req, res) => {
	let responseJson = {
		pageTitle: 'Blog',
		posts: [],
		tags: [],
		tag: []
	};
	responseJson.tag = req.query.t;
	let postFilter = typeof responseJson.tag !== 'undefined' ? { tags: responseJson.tag } : {};

	const tagsPromise = Post.getTagsList();
	const postsPromise = Post.find(postFilter).populate('author');

	const [ tags, posts ] = await Promise.all([ tagsPromise, postsPromise ]);

	for (let i in tags) {
		if (tags[i]._id == responseJson.tag) {
			tags[i].class = 'selected';
		}
	}

	responseJson.tags = tags;
	responseJson.posts = posts;

	res.render('blog', responseJson);
};

exports.post = async (req, res) => {
	const post = await Post.findOne({ slug: req.params.slug });
	res.render('post', { post });
};
