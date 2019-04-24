import bcrypt, { compareSync } from 'bcrypt';
import { tokenGenerator } from '../middleware/authorize';
import pool from '../db/connection';
import addUser from '../middleware/customFunction';
import { createUser, getUser, getUsers } from '../db/queryTables';

// pool.connect();
let userDetails;
class UserController {
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    try {
      const query = await pool.query(createUser, [firstName, lastName, email, bcrypt.hashSync(password, 10)]);
      const token = tokenGenerator({ id: query.rows[0].id, firstName: query.rows[0].firstname, email: query.rows[0].email });
      query.rows[0].token = token;
      delete query.rows[0].password;
      delete query.rows[0].usertype;
      delete query.rows[0].isadmin;
      return res.status(201).json({ data: query.rows[0] });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const confirmUser = await pool.query(getUser, [email]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '409', error: 'User does  not exist. You need to signup ' });
      }
      const comparePassword = compareSync(password, confirmUser.rows[0].password); 
      if (!comparePassword) {
        return res.status(400).json({
          status: '404',
          error: 'Please enter a valid username and password'
        });
      }
      const usersInfo = await pool.query(getUsers, [confirmUser.rows[0].email]);
      const tokenPayloads = { id: usersInfo.rows[0].id, firstName: usersInfo.rows[0].firstname, email: usersInfo.rows[0].email };
      usersInfo.rows[0].token = tokenGenerator(tokenPayloads);
      const data = usersInfo.rows[0];
      return res.status(200).json({ status: '200', data });

    } catch (err) {
      res.json({ error: err.message });
    }
  }
}

const { signUp, signIn } = UserController;

export { signUp, signIn };
