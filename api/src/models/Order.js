const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//    ***S4 : Crear Modelo de Productos ***

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
