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
server.post("/login", passport.authenticate("local"), (req, res) => {
  const usuarioAutenticado = req.user;
  // const { username, password } = req.body;
  // console.log("USUARIO:", username, "CONTRASEÑA: ", password);
  res.redirect("/");
  res.send(usuarioAutenticado);
});

module.exports = server;
