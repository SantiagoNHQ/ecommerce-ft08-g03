const server = require("express").Router();
const {
  Product,
  Category,
  ProductAndCategory,
  User,
  Orden,
  Orderline,
} = require("../db");
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

// S34 : Crear Ruta para creación de Usuario
server.post("/", (req, res) => {
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body.data;
  console.log("Body: ", req.body);

  User.create({ nombre, nombreDeUsuario, email, clave, apellido })
  .then(response => {
      Orden.create({userId: response.dataValues.id
      }).then((response) => {
          res.status(200).send("Usuario creado correctamente.");
      }).catch((err) => {
        console.log("Error linea 24: ", err)
        res.status(404).send("No se pudo crear el usuario.");
      });
  }).catch((err) => {
    console.log("Error linea 28: ", err)
    res.status(404).send("No se pudo crear el usuario.");
  });
});

// S36 : Crear Ruta que retorne todos los Usuarios
server.get("/", (req, res) => {
  User.findAll({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.send("No se pudieron obtener todos los usuarios, error: ", response);
    });
});

// S35 : Crear Ruta para modificar Usuario
server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body.data;

  User.update({
      nombre, apellido, nombreDeUsuario, email, clave
    }, {
      where: {
      id
    }
  }).then(r => {
    console.log("Usuario modificado correctamente: ", r)
    res.status(200).send("Usuario modificado correctamente");
  })
  .catch((err) => {
    console.log("Error linea 60: ", err)
    res.status(404).json(err);
  });
});

// S40 : Crear Ruta para vaciar el carrito
/*  DELETE /users/:idUser/cart/ */
server.delete("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  Orden.findOne({
    where: {
      userId,
      estado: "carrito"
    }
  }).then(r => {
    console.log("Respuesta findOne line 76: ", r)
    let ordenId = r.dataValues.id
    Orderline.destroy({
      where: { ordenId },
    })
      .then((response) => {
        res.send("Carrito vaciado correctamente");
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  }).catch(e => console.log("Error linea 88: ", e))
});

// S41 : Crear Ruta para editar las cantidades del carrito
/*  PUT /users/:idUser/cart */
server.put("/cart/:userId"), (req, res) => {
    const userId = req.params.userId;
    const { productId, cantidad } = req.body.data;

    Orden.findOne({
      where: {
        userId,
        estado: "carrito"
      }
    }).then(r => {
      Orderline.update({ cantidad }, { where: { userId, productId } })
      .then((respuesta) => {
        res.status(200).send("Cantidad modificada correctamente");
      })
      .catch((err) => {
        console.log("Soy err: ", err);
        res.status(400).json(err);
      });
    }).catch(e => console.log("Error linea 110: ", e))
  };

// S39 : Crear Ruta que retorne todos los items del Carrito
/*  GET /users/:idUser/cart */
server.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;

  Orden.findOne({
    where: {
      userId,
      estado: "carrito"
    }
  }).then(r => {
    let ordenId = r.dataValues.id
    Orderline.findAll({
      where: { ordenId }
    })
      .then((response) => {
        console.log("Respuesta: ", response);
        res.json(response);
      })
      .catch((err) => {
        console.log("Soy un err: ", err);
        res.status(400).send(err);
      });
  }).catch(e => console.log("Error linea 130: ", e))
});

// S44 : Crear ruta que retorne todas las ordenes
server.get("/orders", (req, res) => {
  Orden.findAll({})
    .then((response) => {
      console.log("Respuesta: ", response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Soy un err: ", err);
      res.status(400).send(err);
    });
});

// S44: Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status.
server.get("/orders/:status", (req, res) => {
  const estado = req.params.status;
  Orden.findAll({
    where: { estado },
  })
    .then((response) => {
      console.log("Respuesta: ", response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Soy un err: ", err);
      res.status(400).send(err);
    });
});

// S46 : Crear Ruta que retorne una orden en particular.
server.get("/order/:id", (req, res) => {
  const id = req.params.id;
  Orden.findAll({
    where: {
      id,
    },
  })
    .then((response) => {
      console.log("Respuesta: ", response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Soy un err: ", err);
      res.status(400).send(err);
    });
});

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
server.get("/:id/orders", (req, res) => {
  const userId = req.params.id;
  Orden.findAll({
    where: {
      userId
    }
  })
    .then((response) => {
      console.log("Respuesta: ", response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Soy un err: ", err);
      res.status(400).send(err);
    });
});

module.exports = server;
