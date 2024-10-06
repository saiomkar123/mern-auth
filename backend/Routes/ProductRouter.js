const router = require('express').Router();
const { get_products } = require('../Controllers/ProductController');
const { ensureAuthenticated } = require('../Middlewares/Auth');

router.get('/list', ensureAuthenticated, get_products);

module.exports = router;