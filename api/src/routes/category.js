const server = require("express").Router();
const { Category } = require("../db");

server.post("/add", (req, res, next) => {
    const datos = req.body;

    Category.create({
        nombre: datos.nombre,
        descripcion: datos.descripcion
    })
    .then((data) => {
        res.status(200).send("Categoria agregada correctamente");
    })
    .catch((err) => {
        console.log(err);
    });
});

server.delete("/delete", (req, res, next) => {
    const datos = req.body;
    
    Category.destroy({
        where: {
            nombre: datos.nombre
        }
    })
    .then((data) => {
        res.status(200).send("Categoria borrada correctamente");
    })
    .catch((err) => {
        console.log(err);
    });
  });

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

module.exports = server;