const { Router } = require("express");
// import all routers;
//const productRouter = require('./product.js');
const productRouter = require("./product");
const categoryRouter = require("./category");
const userRouter = require("./user");
const carritoRouter = require("./carrito");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
// Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.
// Eso de arriba solucionado con esto de abajo ;)
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/carrito", carritoRouter);

module.exports = router;
