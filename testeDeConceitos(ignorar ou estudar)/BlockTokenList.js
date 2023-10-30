const { Model } = require('sequelize');
const {Sequelize, sequelize } = require('../db/db')

class BlockTokenList extends Model {}

BlockTokenList.init({
  token: Sequelize.STRING
}, { sequelize, modelName: 'blocktokenlist' });


// BlockTokenList.sync({force: true})


module.exports = BlockTokenList  