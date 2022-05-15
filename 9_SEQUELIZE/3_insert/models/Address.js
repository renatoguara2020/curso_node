const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const User = require('../models/User');

const Address = db.define('Address',{


    street:{

        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },

    number:{

        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },


    city:{

        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },


});
//Address.sync({force: true})
module.exports = Address;
User.hasMany(Address)
Address.belongsTo(User);
//Address.sync({force: true});