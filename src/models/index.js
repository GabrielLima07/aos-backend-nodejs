import "dotenv/config";
import { Sequelize } from 'sequelize';
import getUserModel from './user';
import getProfileModel from './profile'; // Importando o modelo Profile
import getLineModel from './line';
import getMatchModel from "./match";
import getUserMatchHistory from './user_match_history';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
  },
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Profile: getProfileModel(sequelize, Sequelize), // Definindo o modelo Profile
  Line: getLineModel(sequelize, Sequelize),
  Match: getMatchModel(sequelize, Sequelize),
  UserMatchHistory: getUserMatchHistory(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
