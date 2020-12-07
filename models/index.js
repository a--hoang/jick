'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const HighScore = require("./highscore.js")(sequelize, Sequelize.DataTypes);
db[HighScore.name] = HighScore;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
