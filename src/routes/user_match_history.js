import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const userMatchesHistories = await req.context.models.UserMatchHistory.findAll();
    res.send(userMatchesHistories);
  } catch (error) {
    console.error("Erro ao retornar histórico de partidas do usuário:", error);
    res.status(500).send({ error: "Erro ao retornar histórico de partidas do usuário." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userMatchHistory = await req.context.models.UserMatchHistory.findByPk(req.params.id);
    if (userMatchHistory) {
      res.send(userMatchHistory);
    } else {
      res.status(404).send({ error: "Histórico de partida do usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao retornar histórico de partida do usuário:", error);
    res.status(500).send({ error: "Erro ao retornar histórico de partida do usuário." });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.user_id || !req.body.match_id) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const userMatchHistory = await req.context.models.UserMatchHistory.create({
      id: uuidv4(),
      user_id: req.body.user_id,
      match_id: req.body.match_id,
      result: null
    });

    res.send(userMatchHistory);
  } catch (error) {
    console.error("Erro ao criar histórico de partida do usuário:", error);
    res.status(500).send({ error: "Erro ao criar histórico de partida do usuário." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userMatchHistory = await req.context.models.UserMatchHistory.findByPk(req.params.id);

    if (userMatchHistory) {
      await userMatchHistory.update({
        result: req.body.result ? req.body.result : userMatchHistory.result,
      });

      await userMatchHistory.save();

      res.send(userMatchHistory);
    } else {
      res.status(404).send({ error: "Histórico de partida do usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao atualizar histórico de partida do usuário:", error);
    res.status(500).send({ error: "Erro ao atualizar histórico de partida do usuário." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await req.context.models.UserMatchHistory.destroy({
      where: { id: req.params.id },
    });

    if (result) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Histórico de partida do usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao deletar histórico de partida do usuário:", error);
    res.status(500).send({ error: "Erro ao deletar histórico de partida do usuário." });
  }
});

export default router;