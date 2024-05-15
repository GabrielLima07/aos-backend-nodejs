import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router();


router.get("/", async (req, res) => {
  const userMatchesHistories = await req.context.models.UserMatchHistory.findAll();
  res.send(userMatchesHistories);
});

router.get("/:id", async (req, res) => {
  const userMatchHistory = await req.context.models.UserMatchHistory.findByPk(
    req.params.id
  );
  res.send(userMatchHistory);
});

router.post("/", async (req, res) => {
  if (!req.body.user_id || !req.body.match_id) {
    res.status(400).json({ error: "Todos os campos devem ser preenchidos"})
  }

  const userMatchHistory = await req.context.models.UserMatchHistory.create({
    id: uuidv4(),
    user_id: req.body.user_id,
    match_id: req.body.match_id,
    result: null
  })

  res.send(userMatchHistory);
});

router.put("/:id", async (req, res) => {
  const userMatchHistory = await req.context.models.UserMatchHistory.findByPk(req.params.id);

  await userMatchHistory.update({
    result: req.body.result ? req.body.result : userMatchHistory.result,
  });

  await userMatchHistory.save();

  res.send(userMatchHistory);
})

router.delete("/:id", async (req, res) => {
  const result = await req.context.models.UserMatchHistory.destroy({
    where: { id: req.params.id },
  });

  return res.send(result !== 0);
})

export default router;