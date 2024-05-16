import "dotenv/config";
import { Sequelize } from 'sequelize';
import getUserModel from './user';
import getMoveModel from './move'; 
import getLineModel from './line';
import getMatchModel from "./match";
import getUserMatchHistory from './user_match_history';
import getWinCombinations from "./win_combinations";

const sequelize = new Sequelize(process.env.POSTGRESQL_URL);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Line: getLineModel(sequelize, Sequelize),
  Match: getMatchModel(sequelize, Sequelize),
  UserMatchHistory: getUserMatchHistory(sequelize, Sequelize),
  Move: getMoveModel(sequelize, Sequelize),
  WinCombinations: getWinCombinations(sequelize,Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
