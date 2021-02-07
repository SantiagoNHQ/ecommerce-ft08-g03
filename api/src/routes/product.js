const server = require("express").Router();
const { Product, Category, ProductAndCategory, Review } = require("../db");
const Sequelize = require("sequelize");
// const Review = require("../models/Review");
// const { isAdmin, isUser, isGuest, isUserOrAdmin } = require("./checkUserState");

//  *** S17-A : Crear ruta para agregar categoria. ***
// POST /products/:idProducto/category/:idCategoria
server.post("/:idProducto/categoria/:idCategoria", (req, res) => {
  var idP = req.params.idProducto;
  var idC = req.params.idCategoria;
  Product.findOne({
    where: {
      id: idP,
    },
  })
    .then((r) => {
      r.addCategory(idC)
        .then((r) => {
          console.log("Bien: ", r);
          res.send("Correcto amigaso");
        })
        .catch((e) => {
          console.log("Errorcito: ", e);
          res.status(400).send("Estamos mal!");
          errorcito = true;
        });
    })
    .catch((e) => {
      console.log("Error linea 187: ", e);
    });
});

//  *** S17-B : Crear ruta borrar categoria. ***
// DELETE /products/:idProducto/category/:idCategoria
server.delete("/:idProducto/categoria/:idCategoria", (req, res) => {
  var idP = req.params.idProducto;
  var idC = req.params.idCategoria;
  ProductAndCategory.destroy({
    where: {
      productId: idP,
      categoryId: idC,
    },
  })
    .then((e) => {
      console.log("Bien: ", e);
      res.send("Correcto amigaso");
    })
    .catch((e) => {
      console.log("Errorcito: ", e);
      res.status(400).send("Estamos mal!");
      errorcito = true;
    });
});

//  *** S20 : Crear ruta para Modificar Categoría ***
server.put("/category/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  Category.findOne({
    where: { id },
  })
    .then((response) => {
      Category.update(
        { nombre: nombre, descripcion: descripcion },
        { where: { id } }
      );
    })
    .then((r) => res.send("Categoria modificada correctamente"))
    .catch((err) => {
      console.log("Soy error: ", err);
      res.json(err);
    });
});

//  *** S21 : Crear ruta que devuelva todos los productos ***
server.get("/", (req, res, next) => {
  Product.findAll({
    include: Category,
  })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//  *** S22 : Crear Ruta que devuelva los productos de X categoría ***
server.get("/categoria/:nombreCat", (req, res) => {
  Category.findAll({
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

//  *** S23 : Crear ruta que retorne productos según el keyword de búsqueda ***
server.get("/busqueda/:products", (req, res) => {
  var string = req.params.products;
  string = string.toLowerCase().trim();
  Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("nombre")), {
          [Sequelize.Op.like]: `%${string}%`,
        }),
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("descripcion")), {
          [Sequelize.Op.like]: `%${string}%`,
        }),
      ],
    },
  })
    .then((response) => {
      console.log("RESPUESTA: ", response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//  *** S24 : Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles ***
server.get("/:id", (req, res) => {
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

//  *** S25 : Crear ruta para crear/agregar Producto ***
server.post("/", (req, res, next) => {
  // Ahora tengo las categorias aca!
  // categories. ahora debo hacer el addCategory aca!

  const {
    tipo,
    edad,
    nombre,
    origen,
    elaboracion,
    descripcion,
    precio,
    stock,
    img,
    categories,
  } = req.body;
  console.log("Las categorias que llegan: ", categories);
  Product.create({
    tipo,
    edad,
    nombre,
    origen,
    elaboracion,
    descripcion,
    precio,
    stock,
    img,
  })
    .then((data) => {
      // Pero primero debo saber los ids de las categorias...
      // data.addCategory(idCategoria)
      Category.findAll()
        .then((category) => {
          let categoriasAgregadas = category.filter((v) =>
            categories.includes(v.dataValues.nombre)
          );
          categoriasAgregadas.forEach((v) => {
            console.log(
              "Agrego la categoría NOMBRE: " +
                v.dataValues.nombre +
                "ID: " +
                v.dataValues.id
            );
            data.addCategory(v.dataValues.id);
          });
        })
        .catch("");

      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//  *** S26 : Crear ruta para Modificar Producto ***
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
    img,
  } = req.body;
  console.log("Editado: ", req.body);
  Product.findOne({
    where: { id },
  })
    .then((response) => {
      Product.update(
        {
          id,
          nombre,
          descripcion,
          stock,
          precio,
          tipo,
          edad,
          elaboracion,
          origen,
          img,
        },
        {
          where: {
            id,
          },
        }
      );
    })
    .then((r) => res.status(200).json(r))
    .catch((err) => {
      console.log("Soy error: ", err);
      res.json(err);
    });
});

//  *** S27 : Crear Ruta para eliminar Producto ***
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
// ************************REVIEW***********************************************************
// S56: Crear ruta para eliminar review.
server.delete("/product/:id/review/:idReview", (req, res) => {
  const id = req.params.id;
  const idReview = req.params.idReview;

  Review.destroy({
    where: {
      id,
      idReview,
    },
  })
    .then((response) => {
      console.log("Review a eliminar: ", response);
      res.json(response);
    })
    .catch((response) => {
      console.log("No se pudo eliminar esta review: ", response);
      res.json(response);
    });
});

//  *** S54 : Crear ruta para crear/agregar Review ***
server.post("/:id/review", (req, res) => {
  var resp2;
  const productId = req.params.id; //id del usuario que agrega el review
  const { descripcion, calificacion, userId } = req.body;

  Review.findOne({
    where: { productId, userId },
  })
    .then((review) => {
      // console.log("ddd: ", ddd);
      console.log("rrr:  ", review);

      if (!review) {
        Review.create({
          descripcion,
          calificacion,
          productId,
          userId,
        })
          .then((resp1) => {
            console.log(resp1);
            res.send(resp1);
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json(err);
          });
      } else {
        resp2 = "el cliente ya posee una review para este producto";
        console.log(resp2);
        res.json(resp2);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

// S57 : Crear Ruta para obtener todas las reviews de un producto.
server.get("/:id/review/", (req, res) => {
  const id = req.params.id;
  Review.findAll({
    where: {
      productId: id,
    }
  })
    .then((response) => {
      console.log("ENTREEEEEEEEEEEEEEEEEEEE", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//  *** S55 : Crear ruta para Modificar Review ***
// FUNCTION: Crear ruta para Modificar Review.
//PUT /product/:id/review/:idReview
server.put("/:id/review/:idReview", (req, res) => {
  const id = req.params.id;
  const idR = req.params.idReview;
  const { descripcion, calificacion } = req.body;

  console.log("Me traen: ", id);
  console.log("COMPAÑEROS!", idR);
  console.log("Soy la descripcion: ", descripcion);
  console.log("Soy la calificacion: ", calificacion);

  Review.update(
    // {nom: req.body.nom },
    { descripcion: descripcion, calificacion: calificacion },
    { where: { productId: id, idReview: idR } }
  )
    .then((answer) => {
      console.log("Soy lo que buscas: ", answer);
      res.send("Review modificada correctamente.");
    })
    .catch((error) => {
      console.log("SOY UN ERROR GRAVE: ", error);
      res.status(400).send("ALERTA DE ERROR!");
    });
});

module.exports = server;
