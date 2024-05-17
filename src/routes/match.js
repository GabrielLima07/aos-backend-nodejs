import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import models from '../models';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const matches = await models.Match.findAll();
    res.json(matches);
  } catch (error) {
    console.error("Erro ao retornar partidas:", error);
    res.status(500).json({ error: "Erro ao retornar partidas." });
  }
});

router.get("/:matchId", async (req, res) => {
  try {
    const match = await models.Match.findByPk(req.params.matchId);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: "Partida não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao retornar partida:", error);
    res.status(500).json({ error: "Erro ao retornar partida." });
  }
});

router.post("/", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Erro ao criar partida:", error);
    res.status(500).json({ error: "Erro ao criar partida." });
  }
});

router.put("/:matchId", async (req, res) => {
  try {
    const match = await models.Match.findByPk(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: "Partida não encontrada." });
    }

    const { player_x_id, player_o_id, state } = req.body;

    await match.update({
      player_x_id: player_x_id !== undefined ? player_x_id : match.player_x_id,
      player_o_id: player_o_id !== undefined ? player_o_id : match.player_o_id,
      state: state !== undefined ? state : match.state
    });

    res.json(match);
  } catch (error) {
    console.error("Erro ao atualizar partida:", error);
    res.status(500).json({ error: "Erro ao atualizar partida." });
  }
});

router.delete("/:matchId", async (req, res) => {
  try {
    const result = await models.Match.destroy({
      where: { id: req.params.matchId },
    });

    if (result !== 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Partida não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao deletar partida:", error);
    res.status(500).json({ error: "Erro ao deletar partida." });
  }
});

export default router;
