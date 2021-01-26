const server = require("express").Router();
const { Product, Category, ProductAndCategory, User } = require("../db");
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

// S34 : Crear Ruta para creación de Usuario
server.post("/", (req, res) => {
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body;

  User.create({ nombre, nombreDeUsuario, email, clave, apellido })
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

// S40 : Crear Ruta para vaciar el carrito
/*  DELETE /users/:idUser/cart/ */
server.delete('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log("Carrito: ", req.body);
  Orden.destroy({
    where: { userId }
  })
    .then((response) => {
      res.send("Carrito vacio correctamente");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

// S41 : Crear Ruta para editar las cantidades del carrito
/*  PUT /users/:idUser/cart */
server.put('/cart/:userId'), (req, res) => {
  const userId = req.params.userId;
  const { cantidad } = req.body;
    Ordenline.update(
    { cantidad: cantidad },
    { where: {userId} }
    )
  .then(r => {
    res.sed("Cantidad modificada correctamente")
  })
  .catch(err => {
    console.log("Soy err: ", err);
    res.status(400).json(err)
  })
};

// S39 : Crear Ruta que retorne todos los items del Carrito
/*  GET /users/:idUser/cart */
server.get('/cart/:ordenId', (req, res) => {
  const ordenId = req.params.ordenId;
  Ordenline.findAll({
    where: { ordenId},
    include: { model: Orden }
  })
  .then((response => {
    console.log("Respuesta: ", response);
    res.json(response)
  }))
  .catch(err => {
    console.log("Soy un err: ", err);
    res.status(400).send(err)
  })
});

module.exports = server;
