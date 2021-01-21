const server = require("express").Router();
const { Product } = require("../db");

//  *** S25 : Crear ruta para crear/agregar Producto ***
server.post("/", (req, res, next) => {
  const { tipo, edad, nombre, origen, elaboracion, descripcion, precio, stock } = req.body;
  console.log("servidorrrrrr", req.body)
  Product.create({
    tipo,
    edad,
    nombre,
    origen,
    elaboracion,
    descripcion,
    precio,
    stock
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//llamado a la api con nombre de producto para el searchBar.
//get//www. algo.com/product/vinito
server.get("/:products", (req, res) => {
  Product.findAll({
    where: { nombre: req.params.products },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = server;
