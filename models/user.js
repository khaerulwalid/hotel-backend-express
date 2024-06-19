'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/hashingPassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username is require'
        },
        notNull: {
          msg: 'Username is require'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is require'
        },
        notNull: {
          msg: 'Password is require'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email is require'
        },
        notNull: {
          msg: 'Email is require'
        }
      }
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Type user is require'
        },
        notNull: {
          msg: 'Type user is require'
        },
        isIn: [['admin', 'user', 'guest']]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, options) => {
    user.password = hashPassword(user.password)
  });

  return User;
};