import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import models, { sequelize } from './models';
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
});

app.use('/user', routes.user);
app.use('/line', routes.line);
app.use('/match', routes.match);
app.use('/user_match_history', routes.userMatchHistory);
app.use('/profile', routes.profile);

const eraseDatabaseOnSync = process.env.ERASE_DB_ON_SYNC === 'true';
const port = process.env.PORT || 3000;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    const users = await createUsers();
    await createLines();
    await createProfiles(users); // Chamar a função para criar perfis
  }
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

const createUsers = async () => {
  const user1 = await models.User.create({
    id: uuidv4(),
    email: "gabriel@gmail.com",
    password: "coxinha123",
    name: "Gabriel Vinicius",
    points: 0,
    profile_pic: null
  });

  const user2 = await models.User.create({
    id: uuidv4(),
    email: "vinicius@gmail.com",
    password: "coxinha123",
    name: "Gabriel Vinicius",
    points: 0,
    profile_pic: null
  });

  return [user1, user2];
};

const createProfiles = async (users) => {
  await models.Profile.create({
    userId: users[0].id,
    profilePic: "https://example.com/pic1.jpg",
    gamesPlayed: 10,
    wins: 5,
    friendsCount: 2,
    ranking: 1
  });

  await models.Profile.create({
    userId: users[1].id,
    profilePic: "https://example.com/pic2.jpg",
    gamesPlayed: 8,
    wins: 3,
    friendsCount: 1,
    ranking: 2
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
