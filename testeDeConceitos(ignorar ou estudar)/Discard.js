const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('./db')
const User = require('./User')

class Discard extends Model {}

Discard.init({
  tipo: Sequelize.INTEGER
}, { sequelize, modelName: 'discard' });

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
    }
}, { sequelize, modelName: 'user' });


// const Discard = db.sequelize.define('discard', {
//     tipo: {
//         type: db.Sequelize.INTEGER
//     }
// })

Discard.belongsTo(User, {
  constraint: true,
  foreignKey: 'userId'
})
//Discard.sync({force: true})


module.exports = Discard  