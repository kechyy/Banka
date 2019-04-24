/* eslint-disable indent */
/* eslint-disable import/order */
/* eslint-disable no-undef */
import randomize from 'randomatic';
import pool from '../db/connection';
import { transactions, updateAccount } from '../db/queryTables';
import { computeNewBalance } from '../middleware/customFunction';

class transactionsController {
  static async debitCredit(req, res) {
    const { id } = req.userInfo;
    const { accountNumber, type } = req.params;
    const { amount } = req.body;
    const payeeName = 'Dare'; const payeePhone = '1234567'; const payeeAccountNumber = 123447;
  const transactionType2 = 'cashout';
    try {
      const confirmUser = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
      
      // if (confirmUser.rows[0].usertype !== 'cashier') {
      //   return res.status(403).json({ status: '403', error: 'Unauthorized User' });
      // }
      const findAcct = await pool.query('SELECT * FROM account WHERE account_number=$1', [accountNumber]);
  
      if (findAcct.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Acount number does not exist '
        });
      }
      if (findAcct.rowCount === 1) {
        if (type === 'debit') {
          if (amount > findAcct.rows[0].balance) {
            return res.status(400).json({
              status: 400,
              error: `Insufficient account balance: [${findAcct.rows[0].balance}]`
            });
          }
        } 
        const newBalance = computeNewBalance(type, findAcct, amount);
        const oldBalance = findAcct.rows[0].balance;
        const transactionId = randomize('a0', 20);
        const date = new Date();
        const transactionDate = date;
        const transactionDetails = [accountNumber, transactionId, transactionDate, confirmUser.rows[0].id,
        amount, type, oldBalance, newBalance, payeeName, payeePhone, transactionType2, payeeAccountNumber];
        
        const computeTrasaction = await pool.query(transactions, transactionDetails);
        await pool.query(updateAccount, [newBalance, findAcct.rows[0].account_number]);
        return res.status(201).json({
          status: '201', data: computeTrasaction.rows[0]
        });
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async transactionHistory(req, res) {
    const { id } = req.params;
    try {
      const transHistory = await pool.query('SELECT * FROM users');
      return res.json(transHistory.rows[0]);
    } catch (err) {
      return res.json({ message: 'connection error' });
    }
  }
}

const { debitCredit, transactionHistory } = transactionsController;

export { debitCredit, transactionHistory };
