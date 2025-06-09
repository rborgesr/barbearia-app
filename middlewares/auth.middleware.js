// auth.middleware.js
function authenticateToken(req, res, next) {
  // Apenas deixa passar sem checar nada
  next();
}

module.exports = authenticateToken;
