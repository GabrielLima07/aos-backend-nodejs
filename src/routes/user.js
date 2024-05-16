import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router();


router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  console.log(users)
  res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).json({ error: "Todos os campos devem ser preenchidos"})
  }

  const user = await req.context.models.User.create({
    id: uuidv4(),
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    points: 0,
    profile_pic: null
  })

  res.send(user);
});

router.put("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);

  await user.update({
    name: req.body.name ? req.body.name : user.name,
    points: req.body.points ? req.body.points : user.points,
    profile_pic: req.body.profile_pic ? req.body.profile_pic : user.profile_pic
  });

  await user.save();

  res.send(user);
})

router.delete("/:userId", async (req, res) => {
  const result = await req.context.models.User.destroy({
    where: { id: req.params.userId },
  });

  return res.send(result !== 0);
})

export default router;