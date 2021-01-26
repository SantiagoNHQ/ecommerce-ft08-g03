const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

<<<<<<< HEAD
//    *** S32 : Crear Modelo de Línea de Orden ***
=======
//    ***S30 : Crear Modelo de Usuario ***
>>>>>>> master

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("orderline", {
    cantidad: {
<<<<<<< HEAD
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
=======
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, // Precio total = precio * cantidad
  })
};
>>>>>>> master
