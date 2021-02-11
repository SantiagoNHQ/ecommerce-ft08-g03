const server = require("express").Router();
const passport = require("passport");
const sequelize = require("sequelize");
const nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");

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

server.get("/me", (req, res) => {
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
  res.send("sesion cerrada");
});

// S67 : Crear ruta /promote
server.post("/promote/:id", (req, res) => {
  var id = req.params.id;
  User.update({ admin: true }, { where: { id } })
    .then((response) => {
      res.send("usuario ascendido a admin");
    })
    .catch((err) => {
      console.log("este error", err);
      res.status(400);
    });
});
// google

server.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

server.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/user",
    successRedirect: "http://localhost:3000/",
  }) /* ,
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  } */
);

server.post("/send-email", (req, res) => {
  // const userEmail = req.body;
  var transporte = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "murl.mccullough38@ethereal.email",
      pass: "qVFWX1Rb58BsxZ6MtB",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // console.log("TRANSPORTE: ", transporte);
  // console.log("OPCIONES: ", mailOptions);
  var mailOptions = {
    from: "WeAreWine",
    to: "armanditous@gmail.com",
    subject: "Enviado desde nodemailer",
    text: "Este es el texto del email",
  };

  transporte.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500);
      return console.log(error);
    } else {
      res.status(200);
      return console.log("Email enviado correctamente.", info.messageId);
    }
  });
});

module.exports = server;
