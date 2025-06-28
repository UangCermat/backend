'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Transactions.belongsTo(models.Categories, {
        foreignKey: 'CategoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  
  Transactions.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Type is required'
        },
        notEmpty: {
          args: true,
          msg: 'Type cannot be empty'
        },
        isIn: {
          args: [['income', 'expense']],
          msg: 'Type must be either income or expense'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CategoryId is required'
        },
        notEmpty: {
          args: true,
          msg: 'CategoryId cannot be empty'
        }
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Amount must be a positive number'
        },
        notNull: {
          args: true,
          msg: 'Amount is required'
        },
        notEmpty: {
          args: true,
          msg: 'Amount cannot be empty'
        }
      }
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Note cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Note is required'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Date must be a valid date'
        },
        notNull: {
          args: true,
          msg: 'Date is required'
        },
        notEmpty: {
          args: true,
          msg: 'Date cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};