const server = require("express").Router();
const passport = require("passport");
const sequelize = require("sequelize");

const {
  User,
  Product,
  Category,
  ProductAndCategory,
  Review,
} = require("../db");
// urlecoded sirve para leer los datos de los inputs, cosa que express por si solo no lo hace


server.get("/", (req, res) => {
  // Si ya iniciamos sesion redireccionamos a Home.
  // Si no iniciamos sesion redireccionamos a /login.
});

//  Mostrar el formulario de Login.
server.get("/login", (req, res) => {
  res.render("Login");
});

// Recibo el email y contraseña para loguearse.
// /auth/login/

server.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log('inicio de sesion exitoso')
        res.json(req.user)
    // res.redirect('/');
});



module.exports = server;
