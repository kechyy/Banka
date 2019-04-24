/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import randomize from 'randomatic';
import { createAccount } from '../db/queryTables';
import pool from '../db/connection';
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
      return res.status(201).json({ status: '201', data: newAccount.rows[0]});
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static updateAccount(req, res) {
    const { accountNumber } = req.params;
    const confirmAcctNumber = bankAccounts.filter(acct => acct.accountNumber === accountNumber)[0];
    if (confirmAcctNumber) {
      if (confirmAcctNumber.status === 'active') {
        confirmAcctNumber.status = 'dormant';
        const { status, accountNumber } = confirmAcctNumber;
        return res.status(200).json({ status: '200', data: { status, accountNumber } });
      }
      if (confirmAcctNumber.status === 'dormant') {
        confirmAcctNumber.status = 'active';
        const { status, accountNumber } = confirmAcctNumber;
        return res.status(200).json({ status: '200', data: { status, accountNumber } });
      }
    }
    return res.status(404).json({
      status: '404',
      error: 'Invalid account number'
    });
  }

  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const confirmAcctNumber = bankAccounts.filter(acct => acct.accountNumber === accountNumber)[0];
    if (confirmAcctNumber) {
      const newArray = bankAccounts.filter(acct => acct.accountNumber !== accountNumber);
      const confirmDel = newArray.find(acct => acct.accountNumber === accountNumber);
      if (!confirmDel) {
        return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
      }
    }
    return res.status(404).json({ status: 404, error: 'Invalid account number' });
  }
}

const { CreateAccount, updateAccount, deleteAccount } = accountController;

export { CreateAccount, updateAccount, deleteAccount };
