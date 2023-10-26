const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('../db/db')
const bcrypt = require('bcrypt');

class Discard extends Model {}
Discard.init({
}, { sequelize, modelName: 'discard' })

class Type extends Model {}
Type.init({
  description: Sequelize.STRING
}, { sequelize, modelName: 'type' })

class User extends Model {}
User.init({
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
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
}, { sequelize, modelName: 'user' })

class Elza extends Model {}
Elza.init({
  lat: Sequelize.STRING,
  long: Sequelize.STRING
}, { sequelize, modelName: 'elza' })

User.beforeCreate(async (user) => {
    user.role = 'user'
    if (user.senha) {
      const saltRounds = 10;
      user.senha = await bcrypt.hash(user.senha, saltRounds);
    }
  });

Discard.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
  })

Discard.belongsTo(Elza, {
  constraint: true,
  foreignKey: 'idElza'
})

Discard.belongsTo(Type, {
  constraint: true,
  foreignKey: 'idType'
})

Elza.hasMany(Discard,{
  foreignKey: 'idElza'
})

User.hasMany(Discard,{
    foreignKey: 'idUser'
})

module.exports = {
    Discard: Discard,
    User: User,
    Elza: Elza,
    Type: Type
}