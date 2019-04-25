/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import randomize from 'randomatic';
import { createAccount, updateAccountDb, getAcctStatus } from '../db/queryTables';
import pool from '../db/connection';
import { updatAcions } from '../middleware/customFunction';
import { bankAccounts } from '../data';

class accountController {
  static async CreateAccount(req, res) {
    const accountNumber = randomize('0', 10);
    const balance = '0.00';
    const accountStatus = 'dormant';
    const { id, email } = req.userInfo;
    const { type } = req.body;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdOn = `${date}  ${time}`;
    const accountInfo = [accountNumber, createdOn, id, type, accountStatus, balance];
    try {
      const newAccount = await pool.query(createAccount, accountInfo);
      delete newAccount.rows[0].account_number;
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
      if (confirmAcctNumber.rowCount === 1) {
        const status = updatAcions(confirmAcctNumber.rows[0].account_status);
        const updateStatus = await pool.query(updateAccountDb, [status, accountNumber]);
        return res.status(200).json({ status: '200', data: updateStatus.rows[0] });
      }
      return res.status(404).json({
        status: '404',
        error: 'Invalid account number'
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const delAccount = await pool.query('DELETE FROM account WHERE account_number=$1', [accountNumber]);
      if (delAccount.rowCount === 1) {
        return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
      }
      return res.status(400).json({ status: 404, error: 'Something went wrong, please ensure the account supplied is valid' });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}

const { CreateAccount, updateAccount, deleteAccount } = accountController;

export { CreateAccount, updateAccount, deleteAccount };
