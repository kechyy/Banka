/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import randomize from 'randomatic';
import { createAccount, updateAccountDb, getAcctStatus,
  delAccount, getAcctTransactions } from '../db/queryTables';
import pool from '../db/connection';
import { updatAcions } from '../middleware/customFunction';

class accountController {
  static async CreateAccount(req, res) {
    const { userid } = req.userInfo;
    const accountNumber = randomize('0', 10);
    const balance = '0.00';
    const accountStatus = 'dormant';
    const { type } = req.body;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdOn = `${date}  ${time}`;
    const accountInfo = [accountNumber, createdOn, userid, type, accountStatus, balance];
    try {
      const confirmUser = await pool.query('SELECT id FROM users WHERE id = $1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this user' });
      }
      const newAccount = await pool.query(createAccount, accountInfo);
      // delete newAccount.rows[0].account_number;
      delete newAccount.rows[0].user_id;
      delete newAccount.rows[0].account_status;
      return res.status(201).json({ status: '201', data: newAccount.rows[0] });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async updateAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const confirmAcctNumber = await pool.query(getAcctStatus, [accountNumber]);
      if (confirmAcctNumber.rowCount === 0) {
        return res.status(404).json({
          status: '404',
          error: 'Invalid account number'
        });
      }
      const status = updatAcions(confirmAcctNumber.rows[0].account_status);
      const updateStatus = await pool.query(updateAccountDb, [status, accountNumber]);
      return res.status(200).json({ status: '200', data: updateStatus.rows[0] });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const deleteAccount = await pool.query(delAccount, [accountNumber]);
      if (deleteAccount.rowCount === 1) {
        return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
      }
      return res.status(400).json({ status: 404, error: 'Something went wrong, please ensure the account supplied is valid' });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async viewAccountHistory(req, res) {
    const { accountNumber } = req.params;
    try {
      const getTransactions = await pool.query(getAcctTransactions, [accountNumber]);
      if (getTransactions.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'Invalid account number' });
      }
      return res.status(200).json({ status: 200, data: getTransactions.rows });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}

const { CreateAccount, updateAccount, deleteAccount, viewAccountHistory } = accountController;

export { CreateAccount, updateAccount, deleteAccount, viewAccountHistory };
