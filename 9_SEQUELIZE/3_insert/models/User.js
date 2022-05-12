const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
  },

  idade:{

    type: DataTypes.INTEGER,
    allowNull: false,
  }
})
//User.sync({force: true})
module.exports = User;
