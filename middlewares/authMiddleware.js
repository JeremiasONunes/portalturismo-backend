const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  // Verifica se o token foi enviado e está no formato correto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
  }

  // Extrai o token do header
  const token = authHeader.split(' ')[1];
  console.log('Token extraído:', token);

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado:', decoded);

    // Adiciona os dados do usuário (payload do token) na requisição
    req.user = decoded;

    // Continua para a próxima função/rota protegida
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
