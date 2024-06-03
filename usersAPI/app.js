const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dasendoriosa',
  database: 'moviesearch'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.use(express.json()); // Добавлено для обработки JSON-тел запросов

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    // После успешной вставки возвращаем id и данные пользователя в таком же формате, как в методе логина
    const user = {
      id: result.insertId,
      username: username,
      email: email
    };
    res.status(201).send({ user });
  });
});



app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Запрос к базе данных, чтобы найти пользователя по электронной почте и паролю
  const sql = 'SELECT id, username, email FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      // Если пользователь не найден, возвращаем ошибку и код состояния 401
      return res.status(401).send({ message: 'Неверное имя пользователя или пароль' });
    }

    // Если пользователь найден, возвращаем информацию о пользователе (без пароля) и код состояния 200
    const user = {
      id: results[0].id,
      username: results[0].username,
      email: results[0].email
    };
    res.status(200).send({ user });
  });
});



app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.post('/user_movies', (req, res) => {
  const { user_id, movie_id } = req.body;
  const sql = 'INSERT INTO user_movies (user_id, movie_id) VALUES (?, ?)';
  db.query(sql, [user_id, movie_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ user_id, movie_id });
  });
});

app.get('/user_movies/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT movie_id FROM user_movies WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.post('/update_user', (req, res) => {
  const { id, username, email } = req.body;
  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(sql, [username, email, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    // После успешного обновления возвращаем id, имя и почту пользователя
    res.status(200).send({ id, username, email });
  });
});

app.post('/update_password', (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  // Сначала проверяем, что текущий пароль пользователя верен
  const checkPasswordSql = 'SELECT * FROM users WHERE id = ? AND password = ?';
  db.query(checkPasswordSql, [id, currentPassword], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    // Если текущий пароль не верен, возвращаем ошибку
    if (results.length === 0) {
      return res.status(401).send({ message: 'Текущий пароль неверен' });
    }
    // Если текущий пароль верен, обновляем пароль пользователя
    const updatePasswordSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updatePasswordSql, [newPassword, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      // После успешного обновления возвращаем id пользователя
      res.status(200).send({ id });
    });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
