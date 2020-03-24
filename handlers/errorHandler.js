exports.notFound = (req, res) => {
	res.status = 404;
	res.render('404');
};
