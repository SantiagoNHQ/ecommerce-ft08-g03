const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//    ***S30 : Crear Modelo de Usuario ***

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("orden", {
    /* lineaDeOrden: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, */
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "carrito" // (carrito, creada, procesando, cancelada, completa)
    },
    paymentid: {
      type: DataTypes.INTEGER,
        defaultValue: 0
    },
    paymentstatus: {
      type: DataTypes.STRING,
        defaultValue: ""
    },
    merchantorderid: {
      type: DataTypes.STRING,
        defaultValue: 0
    }
  })
};
