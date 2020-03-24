const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const postController = require('../controllers/postController');
const blogController = require('../controllers/blogController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', blogController.index);
router.get('/blog/:slug', blogController.post);

router.get('/login', usersController.login);
router.post('/login', usersController.loginAction);

router.get('/login/forget', usersController.forget);
router.post('/login/forget', usersController.forgetAction);
router.get('/login/forget/:token', usersController.forgetToken);
router.post('/login/forget/:token', usersController.forgetTokenAction);

router.get('/logout', usersController.logout);

router.get('/register', usersController.register);
router.post('/register', usersController.registerAction);

router.get('/profile', authMiddleware.isLogged, usersController.profile);
router.post('/profile', authMiddleware.isLogged, usersController.profileAction);
router.post('/profile/password', authMiddleware.isLogged, authMiddleware.changePassword);

router.get('/post/add', authMiddleware.isLogged, postController.index);
router.post('/post/add', authMiddleware.isLogged, imageMiddleware.upload, imageMiddleware.resize, postController.add);

router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit);
router.post(
	'/post/:slug/edit',
	authMiddleware.isLogged,
	imageMiddleware.upload,
	imageMiddleware.resize,
	postController.editAction
);

module.exports = router;
