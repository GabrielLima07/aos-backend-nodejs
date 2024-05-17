import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const moves = await req.context.models.Move.findAll();
    res.json(moves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:moveId", async (req, res) => {
  try {
    const move = await req.context.models.Move.findByPk(req.params.moveId);
    if (!move) {
      return res.status(404).json({ message: "Move not found" });
    }
    res.json(move);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { matchId, playerId, squarePosition } = req.body;
    const move = await req.context.models.Move.create({
      matchId,
      playerId,
      squarePosition,
    });
    res.status(201).json(move);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:moveId", async (req, res) => {
  try {
    const move = await req.context.models.Move.findByPk(req.params.moveId);
    if (!move) {
      return res.status(404).json({ message: "Move not found" });
    }
    const { matchId, playerId, squarePosition } = req.body;
    await move.update({
      matchId,
      playerId,
      squarePosition,
    });
    res.json(move);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:moveId", async (req, res) => {
  try {
    const move = await req.context.models.Move.findByPk(req.params.moveId);
    if (!move) {
      return res.status(404).json({ message: "Move not found" });
    }
    await move.destroy();
    res.json({ message: "Move deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
