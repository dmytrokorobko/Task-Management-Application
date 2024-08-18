const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, getUserId, isAdminRole } = require('./middleware');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const saltRound = 10;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());
app.use('/todo/api', (req, res, next) => {
   console.log("Middleware for /todo/api hit");
   next();
});

//test
app.get('/todo/api/test', (req, res) => {
   return res.status(200).send('I am working');
});

//authentification
//register new user
app.post('/register', (req, res) => {
   const {username, password} = req.body;
   if (!username || !password) return res.status(500).send({message: 'Username and password are required'});  
   const checkUser = db.prepare('SELECT * FROM users WHERE username=?');
   checkUser.get(username, (err, row) => {
      checkUser.finalize();
      if (err) return res.status(500).send({message: 'Error checking username: ' + err.message});
      if (row) return res.status(400).send({message: 'Username already exists'});
      bcrypt.hash(password, saltRound, (err, hashPassword) => {
         if (err) return res.status(400).send({message: 'Bad hash: ' + err.message});        
         const insertNewUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
         insertNewUser.run(username, hashPassword, function (err) {
            insertNewUser.finalize();
            if (err) return res.status(400).send({message: 'Error creating new user: ' + err.message});
            res.status(201).send({message: 'User registered successfully'});
         });
      });
   });
});

//login
app.post('/login', (req, res) => {
   const {username, password} = req.body;
   const checkUser = db.prepare('SELECT * FROM users WHERE username=?');
   checkUser.get(username, async (err, row) => {
      checkUser.finalize();
      if (err) return res.status(500).send({message: 'Error checking username: ' + err.message});
      if (row) {
         const match = await bcrypt.compare(password, row.password);
         if (match) {
            if (row.blocked === 1) return res.status(400).send({message: 'User has been blocked'});
            const token = jwt.sign({username: username}, secretKey, {expiresIn: '60m'});
            res.status(200).send({token, role: row.role});
         } else return res.status(400).send({message: 'Invalid password'});
      } else return res.status(400).send({message: 'User not found'});
   });
});

//==========================================================

//tasks
//get tasks for current user
app.get('/tasks', authenticateToken, getUserId, (req, res) => {
   const tasksQuery = db.prepare('SELECT * FROM tasks WHERE user_id=?');
   tasksQuery.all(req.userId, (err, rows) => {
      tasksQuery.finalize();
      if (err) return res.status(500).send({message: 'Error getting tasks: ' + err.message});
      if (rows && rows.length > 0) {         
         res.status(200).send({tasks: rows});
      } else return res.status(200).send({message: 'Not found any task for current user'});
   });
});

//create new task for current user
app.post('/newtask', authenticateToken, getUserId, (req, res) => {
   const {title, description, expiration} = req.body;
   console.log('Title: ' + title);
   console.log('UserId: ' + req.userId);
   if (title.length === 0) return res.status(500).send({message: 'Title is empty'});
   const taskQuery = db.prepare('INSERT INTO tasks (title, description, expiration, completed, user_id) VALUES (?, ?, ?, ?, ?)');
   taskQuery.run(title, description, expiration, completed = 0, req.userId, function (err) {
      taskQuery.finalize();
      if (err) return res.status(500).send({message: 'Error creating task: ' + err.message});
      res.status(200).send({taskId: this.lastID, message: 'New task was created successfully'});
   });
});

//get data for selected task for current user
app.get('/task/:id', authenticateToken, getUserId, (req, res) => {   
   const { id } = req.params;   
   const taskQuery = db.prepare('SELECT * FROM tasks WHERE user_id=? AND id=?');
   taskQuery.get(req.userId, id, async (err, taskRow) => {
      taskQuery.finalize();
      if (err) return res.status(500).send({message: 'Error getting task: ' + err.message});
      if (taskRow) {
         res.status(200).send({task: taskRow});
      } else return res.status(400).send({message: 'Task not found'});
   });
});

//update selected task for current user
app.put('/task/:id', authenticateToken, getUserId, (req, res) => {      
   const { id } = req.params;   
   const {title, description, expiration, completed} = req.body;   
   if (!title || !description || !expiration || completed === undefined) {
      return res.status(400).send({ message: 'Title, description, expiration, and completed status are required' });
   }
   const updateTask = db.prepare('UPDATE tasks SET title=?, description=?, expiration=?, completed=? WHERE id=? AND user_id=?');
   updateTask.run(title, description, expiration, completed, id, req.userId, function (err) {
      updateTask.finalize();
      if (err) return res.status(500).send({message: 'Operation failed: ' + err.message});
      res.status(200).send({message: 'Task updated successfully'});
   });   
});

//delete selected task for current user
app.delete('/task/:id', authenticateToken, getUserId, (req, res) => {   
   const { id } = req.params;   
   const deleteTask = db.prepare('DELETE FROM tasks WHERE id=? AND user_id=?');
   deleteTask.run(id, req.userId, function (err) {
      deleteTask.finalize();
      if (err) return res.status(500).send({message: 'Operation failed: ' + err.message});
      res.status(200).send({message: 'Task was deleted successfully'});
   });
});

//==========================================================

//users
//get all users
app.get('/users', authenticateToken, getUserId, isAdminRole, (req, res) => {
   const usersQuery = db.prepare('SELECT * FROM users');
   usersQuery.all((err, rows) => {
      usersQuery.finalize();
      if (err) return res.status(500).send({message: 'Error getting users: ' + err.message});
      if (rows && rows.length > 0) {         
         res.status(200).send({users: rows});
      } else return res.status(200).send({message: 'Not found any user in database'});
   });
});

//get data for selected user
app.get('/user/:id', authenticateToken, getUserId, isAdminRole, (req, res) => {   
   const { id } = req.params;   
   const userQuery = db.prepare('SELECT * FROM users WHERE id=?');
   userQuery.get(id, async (err, userRow) => {
      userQuery.finalize();
      if (err) return res.status(500).send({message: 'Error getting user: ' + err.message});
      if (userRow) {
         res.status(200).send({user: userRow});
      } else return res.status(400).send({message: 'User not found'});
   });
});

//update selected user
app.put('/user/:id', authenticateToken, getUserId, isAdminRole, (req, res) => {      
   const { id } = req.params;   
   const {username, role, blocked} = req.body;   
   if (!username || !role || !blocked === undefined) {
      return res.status(400).send({ message: 'Server didn\'t received all data' });
   }
   if (username === 'admin' && role === 'admin') {
      return res.status(500).send({message: 'You can\'t modify super user'});
   }
   const updateUser = db.prepare('UPDATE users SET role=?, blocked=? WHERE id=? AND username=?');
   updateUser.run(role, blocked, id, username, function (err) {
      updateUser.finalize();
      if (err) return res.status(500).send({message: 'Operation failed: ' + err.message});
      res.status(200).send({message: 'User updated successfully'});
   });   
});

//================================================================
//export and listen port
module.exports = {
   app,
   start: (port, callback) => {
     const server = app.listen(port, callback);
     return server;
   }
 };