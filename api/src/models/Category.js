const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//  *** S5 : Crear Modelo de Categorias ***
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("category", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  });
};
