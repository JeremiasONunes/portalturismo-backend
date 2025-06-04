const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');

// Criar um novo contato
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Listar todos os contatos
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json(contacts);
  } catch (error) {
    console.error('Erro ao listar contatos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
