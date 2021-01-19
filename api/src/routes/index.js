const { Router } = require('express');
// import all routers;
//const productRouter = require('./product.js');
const productRouter = require('./product');
const categoryRouter = require('./category');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);

module.exports = router;
