'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasMany(models.Transactions, {
        foreignKey: 'CategoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Categories.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    type: { 
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false ,
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};