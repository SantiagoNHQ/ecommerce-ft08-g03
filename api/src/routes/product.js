const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.post('/', function(req, res) {
    const datos = req.body;
    Product.create({
        tipo: datos.tipo,
        edad: datos.edad,
        nombre: datos.nombre,
        origen: datos.origen,
        elaboracion: datos.elaboracion
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err)
	})
});

server.delete()

module.exports = server;
