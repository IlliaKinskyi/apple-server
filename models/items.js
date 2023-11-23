'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init(
    {
      brand: DataTypes.STRING,
      price: DataTypes.INTEGER,
      vendor_code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      bestsellers: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      popularity: DataTypes.INTEGER,
      diagonal: DataTypes.INTEGER,
      cpu: DataTypes.STRING,
      cores: DataTypes.INTEGER,
      main_camera: DataTypes.STRING,
      front_camera: DataTypes.STRING,
      battery: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Items',
    },
  );
  return Items;
};
