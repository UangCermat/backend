'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suggestions.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Suggestions.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Questions cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Questions are required'
        },
      }
    },
    aiResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'AI response cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'AI response is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Suggestions',
  });
  return Suggestions;
};