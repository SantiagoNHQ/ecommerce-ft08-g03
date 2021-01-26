require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { userInfo } = require("os");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/development`,
  {
    logging: false,//console.log, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, Orden, Orderline, User } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsToMany(Category, { through: "ProductAndCategory" });
Category.belongsToMany(Product, { through: "ProductAndCategory" });
/* Orden.belongsTo(User); // ORDEN = Estado: carrito, completado, cancelado, etc
Orden.hasMany(Orderline)
Orderline.belongsTo(Orden); // Orderline = productId, cantidad, precio, userId
Product.hasOne(Orderline) */
Orden.belongsToMany(Product, { through: Orderline }); // Estos dos
Orden.belongsTo(User); // Es lo mismo que los 4 comentarios de arriba
Orderline.belongsTo(User)

/*
*** TICKET *** = ORDEN
- Leche (1) $80 = Orderline (Orden [User])
- Galletita (3) $300 = Orderline

Total: $380

*/

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
