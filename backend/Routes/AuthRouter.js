const router = require('express').Router();
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { login, signup } = require('../Controllers/AuthController');

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

module.exports = router;