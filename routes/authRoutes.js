const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_super_segura'; // Coloque no .env

// 🔐 LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Senha incorreta.' });

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' } // Pode ajustar a expiração
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// 🔓 LOGOUT (simples, no frontend)
router.post('/logout', (req, res) => {
  // No backend com JWT, o logout geralmente é feito apenas no frontend (removendo o token)
  // Ou você implementa blacklist de tokens, se quiser invalidar no backend
  res.json({ message: 'Logout efetuado. Basta excluir o token no frontend.' });
});

module.exports = router;
