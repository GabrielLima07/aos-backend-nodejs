import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import models, { sequelize } from "./models";

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

app.use("/move", routes.move);
app.use("/user", routes.user);
app.use("/line", routes.line);
app.use("/match", routes.match);
app.use('/table', routes.table);
app.use("/user_match_history", routes.userMatchHistory);
app.use("/wincombinations", routes.winCombinations);


const port = process.env.PORT || 3000;

sequelize.sync().then(async () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

export { sequelize };

export default app;
