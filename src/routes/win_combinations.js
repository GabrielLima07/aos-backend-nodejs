import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post("/", async (req, res) => {
  try {
    const win = await req.context.models.WinCombinations.create({
      id: uuidv4(),
      description: req.body.description,
      line_type: req.body.line_type,
      squares_positions: req.body.squares_positions
    });
    res.status(201).json(win);
  } catch (error) {
    console.error("Erro ao criar combinação vencedora:", error);
    res.status(500).json({ error: "Erro ao criar combinação vencedora." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const win = await req.context.models.WinCombinations.findByPk(req.params.id);
    if (win) {
      res.send(win);
      console.log(win);
    } else {
      res.status(404).send({ error: "Combinação vencedora não encontrada!" });
    }
  } catch (error) {
    console.error("Erro ao retornar combinação vencedora:", error);
    res.status(500).json({ error: "Erro ao retornar combinação vencedora." });
  }
});

router.get("/", async (req, res) => {
  try {
    const wins = await req.context.models.WinCombinations.findAll();
    console.log(wins);
    res.send(wins);
  } catch (error) {
    console.error("Erro ao retornar combinações vencedoras:", error);
    res.status(500).json({ error: "Erro ao retornar combinações vencedoras." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const win = await req.context.models.WinCombinations.findByPk(req.params.id);
    if (win) {
      await win.destroy();
      res.status(204).json();
    } else {
      res.status(404).send({ error: "Combinação vencedora não encontrada!" });
    }
  } catch (error) {
    console.error("Erro ao deletar combinação vencedora:", error);
    res.status(500).json({ error: "Erro ao deletar combinação vencedora." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const win = await req.context.models.WinCombinations.findByPk(req.params.id);
    if (win) {
      await win.update(req.body);
      await win.save();
      res.json(win);
    } else {
      res.status(404).send({ error: "Combinação vencedora não encontrada!" });
    }
  } catch (error) {
    console.error("Erro ao atualizar combinação vencedora:", error);
    res.status(500).json({ error: "Erro ao atualizar combinação vencedora." });
  }
});

export default router;
