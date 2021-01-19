const server = require("express").Router();
const { Product } = require("../../db");
const BodyParser = require("body-parser");

server.use("/", BodyParser.json());
server.post("/", (req, res, next) => {
  const datos = req.body;
  
  Product.create({
    tipo: datos.tipo,
    edad: datos.edad,
    nombre: datos.nombre,
    origen: datos.origen,
    elaboracion: datos.elaboracion
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;