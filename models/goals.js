'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Goals.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Goals.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Title is required'
        },
        min: {
          args: 1,
          msg: 'Title must be at least 1 character long'
        },
      }
    },
    targetAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Target amount cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Target amount is required'
        },
        min: {
          args: 0,
          msg: 'Target amount must be a positive number'
        }
      }
    },
    savedAmount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Goals',
  });
  return Goals;
};