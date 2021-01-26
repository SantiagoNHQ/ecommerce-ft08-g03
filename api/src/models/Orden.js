const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Orden", {
    cantidad: {
      type: DataTypes.INTEGER,
    },
    precioUnitario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
