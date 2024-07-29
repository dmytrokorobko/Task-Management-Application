const jwt = require('jsonwebtoken');
const db = require('./database');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   if (!authHeader) return res.status(401).send({message: 'Authorization was not provided'});
   const token = authHeader.split(' ')[1];
   jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) return res.status(401).send({message: 'Failed to authenticate token: ' + err.message});      
      req.user = decoded;
      next();
   });
};

const getUserId = (req, res, next) => {
   const userIdQuery = db.prepare('SELECT id FROM users WHERE username=?');
   userIdQuery.get(req.user.username, (err, userRow) => {
      userIdQuery.finalize();
      if (err) return res.status(500).send({message: 'Error checking user: ' + err.message});
      if (!userRow) return res.status(404).send({message: 'User not found'});
      req.userId = userRow.id;
      next();
   });
};

module.exports = { authenticateToken, getUserId };