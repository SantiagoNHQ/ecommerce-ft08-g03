const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js"); // En index.js se concentran todas las rutas de routes
const busboy = require("connect-busboy");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./db");
var bcrypt = require("bcryptjs");

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

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

server.use(passport.initialize());
server.use(passport.session());
// configuramos el comportamiento de la estrategia de autenticacion.
// done debe enviar el resultado del proceso de autenticacion.

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({

      where: {
        nombreDeUsuario: username,
      },
    })
      .then((res) => {
        // console.log("password :", password);
        // console.log("hash: ", res.dataValues.clave);
        if (bcrypt.compareSync(password, res.dataValues.clave)) {
          console.log("ESTO ES LA RESPUESTA", res.dataValues.clave);
          return done(null, res.dataValues);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log("ERRORRRRRRRRRRRRRR LINEA 63");
        return done(err);
      });
  })
);

// google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "251069234537-59kr9jpq5u373bf7vqjmd7sdc402natl.apps.googleusercontent.com",
      clientSecret: "1tYNhiesTPO5VkByGreDHsp0",
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      /* User.findOne({
      where: {

      }
    }) */
      User.findOrCreate({
        where: {
          googleId: profile.id,
          email: profile._json.email,
          nombre: profile._json.given_name,
          apellido: profile._json.family_name,
        },
      })
        .then((response) => {
          var [user, create] = response;
          console.log("Perfil user: ", profile);
          done(null, user);
        })
        .catch((err) => {
          console.log("GOOGLE ERROR", err);
          done(err);
        });
    }
  )
);

// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ where: {googleId: profile.id}})
//     .then((err, user) => {
//      return done(err, user);
//     })
//   .catch(err => {
//       console.log("GOOGLE ERROR", err)
//   }
//   );
// }
// ;
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

server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
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
