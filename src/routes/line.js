import { Router } from "express";
import { v4 as uuidv4, validate } from 'uuid';

const router = Router();

router.get("/", async (req, res) => {
  const lines = await req.context.models.Line.findAll();
  res.send(lines);
});

router.get("/:lineId", async (req, res) => {
  const line = await req.context.models.Line.findByPk(req.params.lineId);
  res.send(line);
});

router.post("/", async (req, res) => {
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
});

router.put("/:lineId", async (req, res) => {
  const line = await req.context.models.Line.findByPk(req.params.lineId);

  if (!line) {
    return res.status(404).json({ error: "Linha não encontrada" });
  }

  const { match_id, line_type, squares_positions } = req.body;

  await line.update({
    match_id: match_id ? match_id : line.match_id,
    line_type: line_type ? line_type : line.line_type,
    squares_positions: squares_positions ? squares_positions : line.squares_positions
  });

  res.send(line);
});

router.delete("/:lineId", async (req, res) => {
  const result = await req.context.models.Line.destroy({
    where: { id: req.params.lineId }
  });

  return res.send(result !== 0);
});

export default router;
