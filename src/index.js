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
app.use('/user', routes.user);
app.use('/line', routes.line);

const eraseDatabaseOnSync = process.env.ERASE_DB_ON_SYNC;
const port = process.env.PORT;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsers();
    createLines(); 
  }
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});

const createUsers = async () => {
  await models.User.create({
    id: uuidv4(),
    email: "gabriel@gmail.com",
    password: "coxinha123",
    name: "Gabriel Vinicius",
    points: 0,
    profile_pic: null
  });

  await models.User.create({
    id: uuidv4(),
    email: "vinicius@gmail.com",
    password: "coxinha123",
    name: "Gabriel Vinicius",
    points: 0,
    profile_pic: null
  });
};

const createLines = async () => {
  try {
    
    await models.Line.create({
      id: uuidv4(),
      match_id: "match_id_1",
      line_type: "horizontal",
      squares_positions: ["A1", "A2", "A3"]
    });

    await models.Line.create({
      id: uuidv4(),
      match_id: "match_id_2",
      line_type: "vertical",
      squares_positions: ["B1", "B2", "B3"]
    });

    
    await models.Line.create({
      id: uuidv4(),
      match_id: "match_id_3",
      line_type: "diagonal",
      squares_positions: ["C1", "B2", "A3"]
    });

    console.log('Linhas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar linhas:', error);
  }
};

