const siteTitle = 'Challenge NodeJs Blog';

exports.siteTitle = siteTitle;
exports.menu = [
	{
		text: 'Blog',
		slug: '/',
		title: `Blog of ${siteTitle}`,
		guest: true,
		logged: true
	},
	{
		text: 'Add Post',
		slug: '/post/add',
		title: `Add a title on ${siteTitle}`,
		guest: false,
		logged: true
	},
	{
		text: 'Register',
		slug: '/register',
		title: `Register on ${siteTitle}`,
		guest: true,
		logged: false
	},
	{
		text: 'Login',
		slug: '/login',
		title: `Login on ${siteTitle}`,
		guest: true,
		logged: false
	},
	{
		text: 'Logout',
		slug: '/logout',
		title: `Logout ${siteTitle}`,
		guest: false,
		logged: true
	},
	{
		text: 'Profile',
		slug: '/profile',
		title: `Edit profile`,
		guest: false,
		logged: true
	}
];
