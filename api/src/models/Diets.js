//En Sequelize, los DataTypes no son una propiedad de la clase Sequelize en sí. En cambio, son una clase proporcionada por Sequelize que se utiliza para definir los tipos de datos de los atributos en los modelos.
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
