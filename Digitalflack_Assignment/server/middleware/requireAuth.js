const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "my_secret_key";

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      console.log("err is",err);
      if (err) {
        return res.status(401).json({ error: 'Unauthorized Access' });
      } else {
        const userId = decodedToken.userId;
        User.findById(userId)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          });
      }
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
