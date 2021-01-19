const server = require("express").Router();
const { Product } = require("../../models/Product");
const BodyParser = require("body-parser");

server.use(BodyParser.json());
server.post("/product", (req, res, next) => {
  const datos = req.body;
  Product.create({
    tipo: "Vino",
    edad: 2,
    nombre: "dada",
    origen: "Mendoza",
    elaboracion: 2018,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
// tipo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     edad: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     nombre: {
//       type: DataTypes.STRING,
//     },
//     origen: {
//       type: DataTypes.STRING,
//     },
//     elaboracion: {
