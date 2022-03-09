const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type: DataTypes.STRING,
      allowNull:false
    },
    puntos:{
      type: DataTypes.DECIMAL
    },
    nivel:{
      type: DataTypes.DECIMAL
    },
    paso:{
      type: DataTypes.STRING
    },
    image:{
      type: DataTypes.TEXT,
    },
  });
};
