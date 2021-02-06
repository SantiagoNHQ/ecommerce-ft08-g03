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

//  *** S65 : Crear ruta /me ***
//  Esta ruta tiene que devolver el usuario que está logeado, o 401 si no está logeado.
//  http://www.passportjs.org/docs/
//  https://stackoverflow.com/questions/18739725/how-to-know-if-user-is-logged-in-with-passport-js
//  loggedIn: Middleware para que en get/me llegue el usuario.
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    // res.redirect('/login');
    next();
    console.log("Usuario no logeado");
  }
}

server.get("/me", loggedIn, (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json("No está logeado");
  }
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

module.exports = server;
