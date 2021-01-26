const server = require("express").Router();
const { Product, Category, ProductAndCategory } = require("../db");
const Sequelize = require("sequelize");

//  *** S17-A : Crear ruta para agregar. ***
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

//  *** S17-B : Crear ruta borrar. ***
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
    .then((r) => res.send("Category modificada correctamente"))
    .catch((err) => {
      console.log("Soy error: ", err);
      res.json(err);
    });
});

//  *** S21 : Crear ruta que devuelva todos los productos ***
server.get("/", (req, res, next) => {
  Product.findAll({
    include: Category
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

  const { tipo, edad, nombre, origen, elaboracion, descripcion, precio, stock, img, categories
  } = req.body;
  console.log("Las categorias que llegan: ", categories);
  Product.create({ tipo, edad, nombre, origen, elaboracion, descripcion, precio, stock, img
  })
    .then((data) => {
      // Pero primero debo saber los ids de las categorias...
      // data.addCategory(idCategoria)
      Category.findAll()
        .then((category) => {
          let categoriasAgregadas = category.filter(v => categories.includes(v.dataValues.nombre))
          categoriasAgregadas.forEach(v => {
            console.log("Agrego la categoría NOMBRE: " + v.dataValues.nombre +  "ID: " + v.dataValues.id)
            data.addCategory(v.dataValues.id)
          })
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
  const { id, nombre, descripcion, stock, precio, tipo, edad, elaboracion, origen, img
  } = req.body;
  console.log("Editado: ", req.body);
  Product.findOne({
    where: { id },
  })
    .then((response) => {
      Product.update(
        { nombre, descripcion, stock, precio, tipo, edad, elaboracion, origen, img },
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

module.exports = server;
