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
const { isAdmin, isUser, isGuest, isUserOrAdmin } = require('./checkUserState');
const { response } = require("express");

// S34 : Crear Ruta para creación de Usuario
server.post("/", (req, res) => {
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body.data;
  console.log("Body: ", req.body);

  User.create({ nombre, nombreDeUsuario, email, clave /*:Sequelize.fn('PGP_SYM_ENCRYPT', clave, 'CLAVE_TEST')*/, apellido })
    .then((response) => {
      Orden.create({ userId: response.dataValues.id })
        .then((response) => {
          res.status(200).send("Usuario creado correctamente.");
        })
        .catch((err) => {
          console.log("Error linea 24: ", err);
          res.status(404).send("No se pudo crear el usuario.");
        });
    })
    .catch((err) => {
      console.log("Error linea 28: ", err);
      res.status(404).send("No se pudo crear el usuario.");
    });
});

// S36 : Crear Ruta que retorne todos los Usuarios
server.get("/", (req, res) => {
  User.findAll({
    attributes: [
      [
        Sequelize.fn('PGP_SYM_DECRYPT', Sequelize.cast(Sequelize.col('clave'), 'bytea'), 'CLAVE_TEST'),
        'clave'
      ]
    ]
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((response) => {
      res.send(response);
    });
});

// S37 : Crear ruta para eliminar Usuario

server.delete("users/:id",  (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {
      id,
    },
  })
    .then((response) => {
      console.log("Usuario eliminado correctamente");
      send.res(response);
    })
    .catch((response) => {
      console.log("No se puede eliminar el usuario");
      send.res(response);
    });
});

// S35 : Crear Ruta para modificar Usuario
server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, nombreDeUsuario, email, clave } = req.body.data;

  User.update(
    {
      nombre,
      apellido,
      nombreDeUsuario,
      email,
      clave: Sequelize.fn('PGP_SYM_ENCRYPT', clave, 'CLAVE_TEST'),
    },
    {
      where: {
        id,
      },
    }
  )
    .then((r) => {
      console.log("Usuario modificado correctamente: ", r);
      res.status(200).send("Usuario modificado correctamente");
    })
    .catch((err) => {
      console.log("Error linea 60: ", err);
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
      estado: "carrito",
    },
  })
    .then((r) => {
      console.log("Respuesta findOne line 76: ", r);
      let ordenId = r.dataValues.id;
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
    })
    .catch((e) => console.log("Error linea 88: ", e));
});

// S41 : Crear Ruta para editar las cantidades del carrito
/*  PUT /users/:idUser/cart */
server.put("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const { productId, cantidad } = req.body;

  Orden.findOne({
    where: {
      userId,
      estado: "carrito",
    },
  })
    .then((r) => {
      Orderline.update(
        { cantidad },
        { where: { userId, productId, ordenId: r.dataValues.id } }
      )
        .then((respuesta) => {
          res.status(200).send("Cantidad modificada correctamente");
        })
        .catch((err) => {
          console.log("Soy err: ", err);
          res.status(400).json(err);
        });
    })
    .catch((e) => console.log("Error linea 110: ", e));
});

// S39 : Crear Ruta que retorne todos los items del Carrito
/*  GET /users/:idUser/cart */
server.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;

  Orden.findOne({
    where: {
      userId,
      estado: "carrito",
    },
  })
    .then((r) => {
      let ordenId = r.dataValues.id;
      Orderline.findAll({
        where: { ordenId },
        order: [["productId", "DESC"]],
      })
        .then((response) => {
          console.log("Respuesta: ", response);
          res.json(response);
        })
        .catch((err) => {
          console.log("Soy un err: ", err);
          res.status(400).send(err);
        });
    })
    .catch((e) => console.log("Error linea 130: ", e));
});

// S44 : Crear ruta que retorne todas las ordenes
server.get("/orders", (req, res) => {
  Orden.findAll({
    include: { model: User },
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
      userId,
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

// S38 : Crear Ruta para agregar Item al Carrito
// POST /users/:idUser/cart
server.post("/:userId/cart", (req, res) => {
  //  OJO: TOMA EN CUENTA SOLO EL CASO EN QUE NO EXISTE ORDEN CREADA.
  //  SE DEBE DESARROLLAR EL CASO EN QUE EXISTE UNA ORDEN TIPO CARRITO
  //  PARA ESTE CLIENTE...
  var ordenA;
  var creado;
  // var orden;
  Orden.findOrCreate({
    where: { estado: "carrito", userId: req.params.userId },
  })
    .then((r) => {
      // r = array ultima pos created
      const [orden, created] = r;
      console.log("Created: ", created);
      ordenA = r[0].dataValues.id;
      creado = created;
    })
    .then((orden) => {
      if (creado) {
        // Product.findByPk(req.body.productId).then((product) => {
        //  Busca el producto en el modelo Producto.
        Orderline.create({
          //Crea el Orderline con el producto, userId y orderId.
          cantidad: 1, // Seteamos a 1 para correr la ruta.
          precio: req.body.data.precio, //product.precio,
          productId: req.body.data.productId, //product.id,
          ordenId: ordenA,
          userId: req.params.userId,
          nombre: req.body.data.nombre,
        }).then((orderline) => res.send(orderline));
        // });
      } else {
        // Product.findByPk(req.body.productId).then((product) => {
        Orderline.findOne({
          where: { productId: req.body.data.productId, ordenId: ordenA },
        }).then((orderline) => {
          if (!orderline) {
            Orderline.create({
              precio: req.body.data.precio, //product.precio,
              cantidad: 1,
              productId: req.body.data.productId, //product.id,
              ordenId: ordenA,
              userId: req.params.userId,
              nombre: req.body.data.nombre,
            })
              .then((res1) => {
                res.json(res1);
              })
              .catch((err) => {
                res.send("error", err);
              });
          } else {
            orderline
              .update({ cantidad: Number(orderline.cantidad) + 1 })
              .then((res1) => {
                res.json(res1);
              })
              .catch((err) => {
                res.send("error", err);
              });
          }
        });
      }
    });
});

server.delete("/delete/:productId/:userId", (req, res) => {
  const { productId, userId } = req.params;

  console.log("AAAAAAAAAA", productId);
  console.log("bbbbbbbbbbbbbb", userId);
  Orderline.destroy({
    where: { productId, userId },
  })
    .then((response) => {
      console.log("Objeto a eliminar: ", response);
      res.json(response);
    })
    .catch((err) => {
      console.log("Error al intentar eliminar: ", err);
      res.send(err);
    });
});

//  *** S47 : Crear Ruta para modificar una Orden ***
// PUT /orders/:id
server.put("/orders/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const id = req.params.id;
  const estado = req.body.estado;
  console.log(estado);
  Orden.update({ estado }, { where: { id } })
    .then((r) => {
      res.status(200).send("Estado modificado correctamente");
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});


// S70 : Crear Ruta para password reset
// PUT /user/:id/passwordReset
server.put("/:id/passwordReset", (req, res) => {
  var id = req.params.id
  var password = req.body.password
  User.update(
    {clave: password},
    {where: {
      id
    }}
  )
  .then(response => {
    res.send("Contraseña cambiada correctamente")
  })
  .catch(err => {
    console.log("no se pudo cambiar la contraseña", err)
    res.status(400)
  })

})

module.exports = server;