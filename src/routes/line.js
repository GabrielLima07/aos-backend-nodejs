import { Router } from "express";
import { v4 as uuidv4, validate } from 'uuid';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const lines = await req.context.models.Line.findAll();
    res.send(lines);
  } catch (error) {
    console.error("Erro ao retornar linhas:", error);
    res.status(500).send({ error: "Erro ao retornar linhas." });
  }
});

router.get("/:lineId", async (req, res) => {
  try {
    const line = await req.context.models.Line.findByPk(req.params.lineId);
    if (line) {
      res.send(line);
    } else {
      res.status(404).send({ error: "Linha não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao retornar linha:", error);
    res.status(500).send({ error: "Erro ao retornar linha." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { match_id, line_type, squares_positions } = req.body;

    if (!validate(match_id)) {
      return res.status(400).json({ error: "O match_id deve ser um UUID válido" });
    }

    if (!line_type || !squares_positions) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const line = await req.context.models.Line.create({
      id: uuidv4(),
      match_id,
      line_type,
      squares_positions
    });

    res.send(line);
  } catch (error) {
    console.error("Erro ao criar linha:", error);
    res.status(500).send({ error: "Erro ao criar linha." });
  }
});

router.put("/:lineId", async (req, res) => {
  try {
    const line = await req.context.models.Line.findByPk(req.params.lineId);

    if (!line) {
      return res.status(404).json({ error: "Linha não encontrada." });
    }

    const { match_id, line_type, squares_positions } = req.body;

    await line.update({
      match_id: match_id !== undefined ? match_id : line.match_id,
      line_type: line_type !== undefined ? line_type : line.line_type,
      squares_positions: squares_positions !== undefined ? squares_positions : line.squares_positions
    });

    res.send(line);
  } catch (error) {
    console.error("Erro ao atualizar linha:", error);
    res.status(500).send({ error: "Erro ao atualizar linha." });
  }
});

router.delete("/:lineId", async (req, res) => {
  try {
    const result = await req.context.models.Line.destroy({
      where: { id: req.params.lineId }
    });

    if (result !== 0) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Linha não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao deletar linha:", error);
    res.status(500).send({ error: "Erro ao deletar linha." });
  }
});

export default router;
