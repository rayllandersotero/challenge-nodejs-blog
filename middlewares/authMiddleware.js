exports.isLogged = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You are not authorized to access this page');
		res.redirect('/login');
		return;
	}
	next();
};

exports.changePassword = (req, res) => {
	if (req.body.password !== req.body['password-confirm']) {
		req.flash('error', 'Confirmation of new password are not the same');
		res.redirect('/profile');
		return;
	}

	req.user.setPassword(req.body.password, async () => {
		await req.user.save();
		req.flash('success', 'Password changed successfully');
		res.redirect('/profile');
	});
};
