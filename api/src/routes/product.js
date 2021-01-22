const server = require("express").Router();
const { Product } = require("../db");
const Sequelize = require("sequelize");
//  *** S25 : Crear ruta para crear/agregar Producto ***
server.post("/", (req, res, next) => {
  const {
    tipo,
    edad,
    nombre,
    origen,
    elaboracion,
    descripcion,
    precio,
    stock,
  } = req.body;
  console.log("servidorrrrrr", req.body);
  Product.create({
    tipo,
    edad,
    nombre,
    origen,
    elaboracion,
    descripcion,
    precio,
    stock,
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
  var string = req.params.products;
  string = string.toLowerCase().trim()
  //console.log ("este es el STRING" ,string)

  Product.findAll({
      where: {
        [Sequelize.Op.or]: [
            Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('nombre')), {[Sequelize.Op.like]: `%${string}%`}
            ),
            Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('descripcion')), {[Sequelize.Op.like]: `%${string}%`}
            )
        ]
    }
    })
    .then((response) => {
      console.log("RESPUESTA: ", response)
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

server.delete("/", (req, res) => {
  console.log("BODY: ", req.body);
  Product.destroy({
    where: { nombre: req.body.nombre },
  })
    .then((response) => {
      res.send("Producto eliminado correctamente");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});
server.put("/", (req, res, next) => {
  const {
    id,
    nombre,
    descripcion,
    stock,
    precio,
    tipo,
    edad,
    elaboracion,
    origen,
  } = req.body;
  console.log("Editado: ", req.body);
  Product.findOne({
    where: { id },
  })
    .then((response) => {
      Product.update(
        { nombre, descripcion, stock, precio, tipo, edad, elaboracion, origen },
        {
          where: {
            id,
          },
        }
      );
    })
    .then((r) => res.send("Producto modificado correctamente"))
    .catch((err) => {
      console.log("Soy error: ", err);
      res.json(err);
    });
});

server.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findOne({
    where: {
      id: id,
    },
    include: {
      model: Category,
    },
  })
    .then((response) => {
      console.log("Response: ", response);
      console.log("ID: ", id);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/categoria/:nombreCat", (req, res) => {
  Category.findOne({
    where: { nombre: req.params.nombreCat },
    include: { model: Product },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("Error ", err);
    });
});

module.exports = server;
