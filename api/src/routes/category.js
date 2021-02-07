const server = require("express").Router();
const { Category, Product } = require("../db");
// const { isAdmin, isUser, isGuest, isUserOrAdmin } = require("./checkUserState");

//  *** S18 : Crear ruta para crear/agregar Categoría ***
server.post("/add", (req, res, next) => {
  const datos = req.body;

  Category.create({
    nombre: datos.nombre,
    descripcion: datos.descripcion,
  })
    .then((data) => {
      res.status(200).send("Categoria agregada correctamente");
    })
    .catch((err) => {
      console.log(err);
    });
});

//  *** S19 : Crear Ruta para eliminar Categoría ***
server.delete("/delete", (req, res, next) => {
  const datos = req.body;

  Category.destroy({
    where: {
      nombre: datos.nombre,
    },
  })
    .then((data) => {
      res.status(200).send("Categoria borrada correctamente");
    })
    .catch((err) => {
      console.log(err);
    });
});

//  *** Esta ruta devuelve todas las categorias creadas ***
server.get("/", (req, res, next) => {
  Category.findAll()
    .then((category) => {
      res.send(category);
    })
    .catch(next);
});

module.exports = server;
