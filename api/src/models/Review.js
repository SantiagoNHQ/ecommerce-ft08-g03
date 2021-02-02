const { DataTypes } = require("sequelize");
<<<<<<< HEAD

module.exports = (sequelize) => {
  sequelize.define("review", {
    descripcion: {
      type: DataTypes.STRING,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.STRING,
=======
module.exports = (sequelize) => {
  sequelize.define("review", {
    descripcion: {
      type: DataTypes.TEXT,
    },
    calificacion: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
>>>>>>> 7ae9d3fede494bf388208816baa898e271f9d7a9
      allowNull: false,
    },
  });
};
