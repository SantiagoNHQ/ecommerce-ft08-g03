const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//    ***S30 : Crear Modelo de Usuario ***

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("orderline", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, // Precio total = precio * cantidad
  })
};