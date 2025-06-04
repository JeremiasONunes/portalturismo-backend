require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const User = require('./models/User');
const Contact = require('./models/Contact');
const cors = require('cors');

app.use(cors());

// ou, para liberar só seu frontend:
app.use(cors({
  origin: 'http://localhost:5173', // ou '*', mas não recomendado em produção
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // ajuste se precisar
}));



app.use(express.json());

// Rota base
app.get('/', (req, res) => res.send('API funcionando'));

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco MySQL!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Modelos sincronizados!');require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Importa os modelos (opcional, já sincronizados no sequelize.sync())
const User = require('./models/User');
const Contact = require('./models/Contact');

// Importa as rotas que você criou
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Middleware para parsear JSON do corpo das requisições
app.use(express.json());

// Rota base para teste rápido da API
app.get('/', (req, res) => res.send('API funcionando'));

// Rotas da API
app.use('/api/users', userRoutes);       // Rotas CRUD para usuários
app.use('/api/contacts', contactRoutes); // Rotas para contato (cadastrar e listar)

app.use('/api/auth', authRoutes);

// Porta que o servidor vai escutar
const PORT = process.env.PORT || 5000;

// Conecta ao banco e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco MySQL!');
    return sequelize.sync(); // Sincroniza os modelos com o banco
  })
  .then(() => {
    console.log('✅ Modelos sincronizados!');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('🔴 Erro ao conectar/sincronizar:', err));

    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('🔴 Erro ao conectar/sincronizar:', err));
