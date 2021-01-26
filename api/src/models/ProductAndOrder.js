const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProductAndOrder", {
    cantidad: {
      type: DataTypes.INTEGER,
    },
  });
};
