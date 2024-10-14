const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'No token provided!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch {
      console.error('Invalid token');
      return res.status(400).json({ message: 'Invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};