import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.error("Erro ao retornar usuários:", error);
    res.status(500).send({ error: "Erro ao retornar usuários." });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao retornar usuário:", error);
    res.status(500).send({ error: "Erro ao retornar usuário." });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const user = await req.context.models.User.create({
      id: uuidv4(),
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      points: 0,
      profile_pic: null
    });

    res.send(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send({ error: "Erro ao criar usuário." });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);

    if (user) {
      await user.update({
        name: req.body.name ? req.body.name : user.name,
        points: req.body.points ? req.body.points : user.points,
        profile_pic: req.body.profile_pic ? req.body.profile_pic : user.profile_pic
      });

      await user.save();

      res.send(user);
    } else {
      res.status(404).send({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send({ error: "Erro ao atualizar usuário." });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const result = await req.context.models.User.destroy({
      where: { id: req.params.userId },
    });

    if (result) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro deletar usuário:", error);
    res.status(500).send({ error: "Erro deletar usuário." });
  }
});

export default router;