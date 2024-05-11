import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes'
import models, { sequelize } from './models'
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByEmail("gabriel@gmail.com"),
  };
  next();
})
app.use('/user', routes.user)


const eraseDatabaseOnSync = process.env.ERASE_DB_ON_SYNC;
const port = process.env.PORT;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsers();
  }
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});


const createUsers = async () => {
  await models.User.create(
    {
      id: uuidv4(),
      email: "gabriel@gmail.com",
      password: "coxinha123",
      name: "Gabriel Vinicius",
      points: 0,
      profile_pic: null
    }
  );
  await models.User.create(
    {
      id: uuidv4(),
      email: "vinicius@gmail.com",
      password: "coxinha123",
      name: "Gabriel Vinicius",
      points: 0,
      profile_pic: null
    }
  )
};