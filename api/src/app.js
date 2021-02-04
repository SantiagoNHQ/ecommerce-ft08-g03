const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const busboy = require("connect-busboy");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { User } = require("./db");

require("./db.js");

const server = express();

server.name = "API";
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser("secret"));
server.use(morgan("dev"));
server.use(busboy());
server.use(
  session({
    secret: "secret",
    // resave en true = en cada peticion, aunque la sesion no haya sido modificada la vamos a guardar.
    resave: true,
    // saveUnitialized en true = si inicializamos sesion en una peticion y no le guardamos nada, aun asi se guarda.
    saveUninitialized: true,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// configuramos el comportamiento de la estrategia de autenticacion.
// done debe enviar el resultado del proceso de autenticacion.
passport.use(
  new Strategy(function (username, password, done) {
    // User.findOne({
    //   where: {
    //     nombreDeUsuario: username,
    //     clave: password,
    //   },
    // })
    //   .then((res) => {
    //     if (res.dataValues) {
    //       console.log(res.dataValues);
    //       return done(null, res.dataValues);
    //     } else {
    //       return done(null, false);
    //     }
    //   })
    //   .catch((err) => {
    //     return done(err);
    //   });
    var user = { id: 1 };
    done(null, user);
  })
);
// serializacion
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializacion

passport.deserializeUser(function (id, done) {
  //aqui hay que buscar el usuario con el id en la base de datos.
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((res) => {
      return done(null, res.dataValues);
    })
    .catch((err) => {
      return done(err);
    });
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
