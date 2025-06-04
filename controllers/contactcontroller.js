const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');

// CREATE - Cadastrar contato
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar contato' });
  }
});

// READ - Listar todos os contatos
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar contatos' });
  }
});

module.exports = router;
