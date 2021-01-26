const server = require("express").Router();
const { Product, Category, ProductAndCategory, User } = require("../db");
const Sequelize = require("sequelize");

// S34 : Crear Ruta para creación de Usuario
server.post("/", (req, res) => {
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body;

  User.create({
    nombre,
    nombreDeUsuario,
    email,
    clave,
    apellido,
  })
    .then((response) => {
      res.status(200).send("Usuario creado correctamente.");
    })
    .catch((err) => {
      res.status(404).send({ "No se pudo crear el usuario.": err });
    });
});

// S36 : Crear Ruta que retorne todos los Usuarios
server.get("/", (req, res) => {
  User.findAll({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.send("no se pudo crear ell usuario", response);
    });
});

// S35 : Crear Ruta para modificar Usuario
server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body;
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log("User: ", user);
      // user.nombre = nombre;
      // user.apellido = apellido;
      user.nombreDeUsuario = nombreDeUsuario;
      // user.email = email;
      user.clave = clave;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = server;
