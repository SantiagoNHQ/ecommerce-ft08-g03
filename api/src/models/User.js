const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//    ***S30 : Crear Modelo de Usuario ***

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    nombre: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    nombreDeUsuario: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    clave: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    googleId: {
      type: DataTypes.TEXT
    }
  });
};
