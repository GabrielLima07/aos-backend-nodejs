import { Router } from 'express';

const router = Router();

// Obter o perfil de um usuário

router.get('/', (req, res) => {
  res.send('profile');
});
router.get('/:userId', async (req, res) => {
  try {
    const profile = await req.context.models.Profile.findOne({
      where: { userId: req.params.userId },
      include: [{ model: req.context.models.User, as: 'user' }],
    });
    return res.send(profile);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Atualizar o perfil de um usuário
router.put('/:userId', async (req, res) => {
  try {
    const { profilePic, gamesPlayed, wins, friendsCount, ranking } = req.body;
    const profile = await req.context.models.Profile.update(
      { profilePic, gamesPlayed, wins, friendsCount, ranking },
      { where: { userId: req.params.userId }, returning: true }
    );
    return res.send(profile);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
