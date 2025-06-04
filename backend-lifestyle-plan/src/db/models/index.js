'use strict';

import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import config from '../src/db/config/config.ts';

let db;

async function initDb() {
  db = {};

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(_env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  // Import models from src/models folder
  const models = [
    'user.model',
    'profile.model',
  ];

  const modelImports = models.map(model => {
    const modelPath = join(__dirname, '../../../models', model);
    return import(modelPath);
  });

  const modelFiles = await Promise.all(modelImports);

  modelFiles.forEach(modelFile => {
    const modelClass = modelFile.default(sequelize, DataTypes);
    db[modelClass.name] = modelClass;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

initDb();

export default db;