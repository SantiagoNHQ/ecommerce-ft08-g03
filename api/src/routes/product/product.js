const server = require("express").Router();
const { Product, Category } = require("../../db.js");

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
//borra un producto
server.delete("/", (req, res) => {
  console.log("BODY: ", req.body)
  Product.destroy({
    where: { nombre: req.body.nombre },
  })
    .then((response) => {
      res.send("Producto eliminado correctamente")
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//S22 : Crear Ruta que devuelva los productos de X categoría
//GET /products/categoria/:nombreCat
server.get("/categoria/:nombreCat", (req, res) => {
   Category.findOne({
      where: { nombre: req.params.nombreCat},
      include: {model: Product}
    })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.log("Error ", err)
    })
})
module.exports = server;
