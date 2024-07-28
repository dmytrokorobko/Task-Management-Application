const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const saltRound = 10;
const secretKey = "mySecretKey";

app.use(bodyParser.json());
app.use(cors());

//routes
//register new user
app.post('/register', (req, res) => {
   const {username, password} = req.body;
   if (!username || !password) return res.status(500).send({message: 'Username and password are required'});   
   bcrypt.hash(password, saltRound, (err, hashPassword) => {
      if (err) return res.status(400).send({message: 'Bad hash ' + err.message});        
      const q = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
      q.run(username, hashPassword, function (err) {
         q.finalize();
         if (err) return res.status(400).send(err.message);
         res.status(201).send({message: 'User registered successfully'});
      });
   })
});

//login
app.post('/login', (req, res) => {
   const {username, password} = req.body;
   const q = db.prepare('SELECT * FROM users WHERE username=?');
   q.get(username, async (err, row) => {
      q.finalize();
      if (err) return res.status(500).send({message: 'Error retrieving data from database'});
      if (row) {         
         const isPasswordValid = await bcrypt.compare(password, row.password);
         if (isPasswordValid) {
            const token = jwt.sign({username: username}, secretKey, {expiresIn: '15m'});
            res.status(200).send({token, role: row.role});
         } else return res.status(400).send({message: 'Invalid password'});
      } else return res.status(400).send({message: 'User not found'});
   });
});

//other methods

//================================================================
//export and listen port
module.exports = {
   app,
   start: (port, callback) => {
     const server = app.listen(port, callback);
     return server;
   }
 };