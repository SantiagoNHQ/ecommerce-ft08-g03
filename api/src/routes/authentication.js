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

server.post("/login", passport.authenticate("local"), function (req, res) {
  console.log("inicio de sesion exitoso");
  res.status(200).json(req.user);
  // res.redirect('/');
});

// S64: Crear ruta de logout.

server.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// S67 : Crear ruta /promote
server.post("/promote/:id", (req, res)=> {
  var id = req.params.id
  User.update(
    {admin: true},
    {where: { id}}
  )
  .then(response => {
    res.send("usuario ascendido a admin")
  })
  .catch(err => {
    console.log("este error", err)
    res.status(400)
  })
})

module.exports = server;
