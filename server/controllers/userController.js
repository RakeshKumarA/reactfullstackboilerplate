const db = require('../db');

const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc		Auth User and get token
// @route 	POST /api/users/login
// @access 	Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users where email='${email}'`);

    if (user) {
      const pwdInDb = await db.query(
        `SELECT password FROM users WHERE email = '${email}'`
      );
      const pwdhash = pwdInDb.rows[0].password;

      bcrypt.compare(password, pwdhash, function (err, result) {
        if (result) {
          res.json({
            id: user.rows[0].id,
            email: user.rows[0].email,
            name: user.rows[0].name,
            isadmin: user.rows[0].isadmin,
            token: generateToken(user.rows[0].id),
          });
        } else {
          res.json({ message: 'Password Incorrect' });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc		Register a user
// @route 	POST /api/users
// @access 	Public
const registerUser = async (req, res) => {
  const { name, email, password, isadmin } = req.body;

  const user = await db.query('SELECT * FROM users where email=$1', [email]);

  if (user.rowCount !== 0) {
    return res.status(401).json({ message: 'User Already Exists' });
  }

  try {
    if (isadmin) {
      const results = await db.query(
        'INSERT INTO users (name, email, password, isAdmin) values ($1, $2, $3, $4) returning *',
        [name, email, bcrypt.hashSync(password, 10), isadmin]
      );
      const token = generateToken(results.rows[0].id);
      res.status(201).json({
        id: results.rows[0].id,
        name: results.rows[0].name,
        email: results.rows[0].email,
        isadmin: results.rows[0].isadmin,
        token: token,
      });
    } else {
      const results = await db.query(
        'INSERT INTO users (name, email, password) values ($1, $2, $3) returning *',
        [name, email, bcrypt.hashSync(password, 10)]
      );
      const token = generateToken(results.rows[0].id);
      res.status(201).json({
        id: results.rows[0].id,
        name: results.rows[0].name,
        email: results.rows[0].email,
        isadmin: results.rows[0].isadmin,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authUser: authUser,
  registerUser: registerUser,
};
