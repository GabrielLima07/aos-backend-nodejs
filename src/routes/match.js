import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import models from '../models';

const router = Router();

router.get("/", async (req, res) => {
  const matches = await models.Match.findAll();
  res.json(matches);
});

router.get("/:matchId", async (req, res) => {
  const match = await models.Match.findByPk(req.params.matchId);
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: "Partida não encontrada" });
  }
});

router.post("/", async (req, res) => {
  const { player_x_id, player_o_id, state } = req.body;

  if (!player_x_id || !player_o_id || !state) {
    return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
  }

  const match = await models.Match.create({
    id: uuidv4(),
    player_x_id,
    player_o_id,
    state
  });

  res.status(201).json(match);
});

router.put("/:matchId", async (req, res) => {
  const match = await models.Match.findByPk(req.params.matchId);
  if (!match) {
    return res.status(404).json({ error: "Partida não encontrada" });
  }

  const { player_x_id, player_o_id, state } = req.body;

  await match.update({
    player_x_id: player_x_id || match.player_x_id,
    player_o_id: player_o_id || match.player_o_id,
    state: state || match.state
  });

  res.json(match);
});

router.delete("/:matchId", async (req, res) => {
  const result = await models.Match.destroy({
    where: { id: req.params.matchId },
  });

  if (result !== 0) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Partida não encontrada" });
  }
});

export default router;
