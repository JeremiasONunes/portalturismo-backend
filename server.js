require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Configuração do CORS: altere o origin para o endereço do seu frontend
app.use(cors({
  origin: 'http://localhost:5173', // substitua pelo seu frontend (ou '*', para liberar geral)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Rota base para teste rápido da API
app.get('/', (req, res) => res.send('API funcionando'));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

// Porta que o servidor vai escutar
const PORT = process.env.PORT || 5000;

// Conecta ao banco e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco MySQL!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Modelos sincronizados!');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('🔴 Erro ao conectar/sincronizar:', err));
