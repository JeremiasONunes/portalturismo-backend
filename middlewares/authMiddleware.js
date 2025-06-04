const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adiciona os dados do usuário à requisição
    req.user = decoded;

    // Continua para a próxima função
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
