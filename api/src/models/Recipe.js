const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allownull: false,
    },
    title: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allownull: false,
      defaultValue:
        "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/ehhmf8h7yetjefseyln1.jpg",
    },
    summary: {
      type: DataTypes.TEXT,
      allownull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      allownull: false,
    },
  });
};

//En resumen, el defaultValue en el atributo de imagen del modelo de receta se utiliza para establecer una imagen predeterminada en caso de que no se proporcione una imagen específica al crear una nueva receta. Esto asegura que cada receta tenga una imagen asociada y brinda una experiencia consistente para los usuarios.
