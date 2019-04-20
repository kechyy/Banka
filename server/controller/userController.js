import bcrypt from 'bcrypt';
import { tokenGenerator } from '../middleware/authorize';
import { userSignUp } from '../data';
import pool from '../db/connection';
import { createUser } from '../db/queryTables';

// pool.connect();


class UserController {
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    try {
      const query = await pool.query(createUser, [firstName, lastName, email, bcrypt.hashSync(password, 10)]);
      const token = tokenGenerator(query.rows[0].id, query.rows[0].firstName, query.rows[0].usertype);
      query.rows[0].token = token;
      delete query.rows[0].password;
      delete query.rows[0].usertype;
      delete query.rows[0].isadmin;
      return res.status(201).json({ data: query.rows[0] });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static signIn(req, res) {
    const { email, password } = req.body;
    const confirmUser = userSignUp.find(loginUser => loginUser.email === email
      && loginUser.password === password);
    if (!confirmUser) {
      return res.status(404).json({
        status: '404',
        error: 'Please enter a valid username and password'
      });
    }
    confirmUser.token = tokenGenerator(confirmUser.id);
    const data = confirmUser;
    return res.status(200).json({ status: '200', data });
  }
}

const { signUp, signIn } = UserController;

export { signUp, signIn };
