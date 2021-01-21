const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//    ***S4 : Crear Modelo de Productos ***

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    origen: {
      type: DataTypes.STRING,
    },
    elaboracion: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.REAL,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    thumbImg: {
      type: DataTypes.STRING,
    },
  });
};
