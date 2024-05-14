import "dotenv/config";
import { Sequelize } from 'sequelize';
import getUserModel from './user';
import getLineModel from './line'; // Importe a função getLineModel
import getMatchModel from "./match";

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
  Line: getLineModel(sequelize, Sequelize),
  Match: getMatchModel(sequelize, Sequelize)
  //TODO: Adicionar outros modelos aqui
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
})

export { sequelize };

export default models;
