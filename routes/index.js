const router = require('express').Router();
const jsonParser = require('express').json();
const usersRoutes = require('./users.routes');
const sessionRoutes = require('./users.session');
const productRoutes = require('./products.routes');

router.use(jsonParser);
router.use('/users', usersRoutes);
router.use('/sessions', sessionRoutes);
router.use('/products', productRoutes);

module.exports = router;
