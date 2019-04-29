import bcrypt, { compareSync } from 'bcrypt';
import randomize from 'randomatic';
import { tokenGenerator } from '../middleware/authorize';
import pool from '../db/connection';
import {
  createUser, getUser, getUsers, createAccount, getAcctTransactions
} from '../db/queryTables';

// pool.connect();
class UserController {
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    try {
      const query = await pool.query(createUser,
        [firstName, lastName, email, bcrypt.hashSync(password, 10)]);
      const token = tokenGenerator({
        userid: query.rows[0].id,
        firstName: query.rows[0].firstname,
        email: query.rows[0].email,
        usertype: query.rows[0].usertype
      });
      query.rows[0].token = token;
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
        return res.status(404).json({ status: '404', error: 'User does  not exist. You need to signup' });
      }
      const comparePassword = compareSync(password, confirmUser.rows[0].password);
      if (!comparePassword) {
        return res.status(400).json({
          status: '400',
          error: 'Please enter a valid username and password'
        });
      }
      const usersInfo = await pool.query(getUsers, [confirmUser.rows[0].email]);
      const tokenPayloads = {
        userid: usersInfo.rows[0].id,
        firstName: usersInfo.rows[0].firstname,
        usertype: usersInfo.rows[0].usertype
      };
      usersInfo.rows[0].token = tokenGenerator(tokenPayloads);
      const data = usersInfo.rows[0];
      return res.status(200).json({ status: '200', data });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async createUserAccount(req, res) {
    const { userid, email } = req.userInfo;

    const accountNumber = randomize('0', 10);
    const balance = '0.00';
    const accountStatus = 'dormant';
    const { type } = req.body;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdOn = `${date}  ${time}`;
    const accountInfo = [accountNumber, createdOn, userid, email, type, accountStatus, balance];
    try {
      const confirmUser = await pool.query('SELECT id FROM users WHERE id = $1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this user' });
      }
      const newAccount = await pool.query(createAccount, accountInfo);
      return res.status(201).json({ status: '201', data: newAccount.rows[0] });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async viewAccountHistory(req, res) {
    const { accountNumber } = req.params;
    try {
      const getTransactions = await pool.query(getAcctTransactions, [accountNumber]);
      if (getTransactions.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'No transaction found' });
      }
      return res.status(200).json({ status: 200, data: getTransactions.rows });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async viewSpecificAccount(req, res) {
    const { transactionId } = req.params;
    const { accountNumber } = req.body;
    const { userid } = req.userInfo;
    const getAcctNumber = await pool.query(`SELECT * FROM account where account_number=$1 and
    user_id=$2`, [accountNumber, userid]);
    if (getAcctNumber.rowCount === 0) {
      return res.status(404).json({ status: '404', error: 'Account number not found' });
    }
    const getSpecificAcctTransaction = await pool.query(`SELECT account_number, transaction_id, transaction_date,
    amount, transaction_type, new_balance FROM transactions WHERE
    transaction_id=$1 and account_number=$2`, [transactionId, accountNumber]);
    if (getSpecificAcctTransaction.rowCount === 0) {
      return res.status(404).json({ status: '404', error: 'No transaction found' });
    }
    return res.status(200).json({ status: '200', data: getSpecificAcctTransaction.rows[0] });
  }
}
// viewSpecificAccountValidate, tokenVerifier, 
const {
  signUp, signIn, createUserAccount, viewAccountHistory, viewSpecificAccount
} = UserController;

export {
  signUp, signIn, createUserAccount, viewAccountHistory, viewSpecificAccount
};
