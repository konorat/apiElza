const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('./db')
const bcrypt = require('bcrypt');
const Discard = require('./Discard')

class User extends Model {}

User.init({
    name: Sequelize.STRING,
    email: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
    }
}, { sequelize, modelName: 'user' });

// const User = db.sequelize.define('user', {
//     name: {
//         type: db.Sequelize.STRING
//     },
//     email: {
//         type: db.Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     senha: {
//         type: db.Sequelize.STRING,
//         allowNull: false
//     }
// })

User.hasMany(Discard,{
    foreignKey: 'discdId'
})

User.beforeCreate(async (user) => {
    user.role = 'user'
    if (user.senha) {
      const saltRounds = 10;
      user.senha = await bcrypt.hash(user.senha, saltRounds);
    }
  });

//User.sync({force: true})

module.exports = User