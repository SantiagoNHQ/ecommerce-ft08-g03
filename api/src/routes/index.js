const { Router } = require("express");
// import all routers;
//const productRouter = require('./product.js');
const productRouter = require("./product");
const categoryRouter = require("./category");
const userRouter = require("./user");
const fileUpload = require("./fileUpload");
const authentication = require("./authentication");

const router = Router();

router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/upload", fileUpload);
router.use("/auth", authentication);

module.exports = router;
