const jwt = require('jsonwebtoken');
const db = require('./database');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const secretKey = 'mySecretKey'; //process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {   
   const authHeader = req.headers['authorization'];  
   if (!authHeader) return res.status(401).send({message: 'Authorization was not provided'});
   const token = authHeader.split(' ')[1];
   jwt.verify(token, secretKey, (err, decoded) => {
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

const isAdminRole = (req, res, next) => {
   const userRoleQuery = db.prepare('SELECT role FROM users WHERE username=? AND id=?');
   userRoleQuery.get(req.user.username, req.userId, (err, userRow) => {
      userRoleQuery.finalize();
      if (err) return res.status(500).send({message: 'Error checking user: ' + err.message});
      if (!userRow) return res.status(404).send({message: 'User role not found'});
      req.userRole = userRow.role;
      next();
   });
}

module.exports = { authenticateToken, getUserId, isAdminRole };