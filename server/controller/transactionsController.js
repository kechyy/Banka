/* eslint-disable indent */
/* eslint-disable import/order */
/* eslint-disable no-undef */
import randomize from 'randomatic';
import { Pool } from 'pg';
import { bankAccounts, accountTransactionsData } from '../data';


const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on('connect', () => {
  console.log('connected to the db');
});

class transactionsController {
  static debitCredit(req, res) {
    const userId = req.userInfo.payload;
    const { accountNumber, type } = req.params;
    const { amount } = req.body;
    const findAcct = bankAccounts.find(acct => acct.accountNumber === accountNumber);
    if (findAcct !== undefined) {
      if (type === 'debit') {
        if (amount > findAcct.openingBalance) {
          return res.status(400).json({
            status: 400,
            error: `Insufficient account balance: [${findAcct.openingBalance}]`
          });
        }
        const newAmount = parseFloat(findAcct.openingBalance) - parseFloat(amount);
        accountTransactionsData.push({
          transactionId: randomize('a0', 20),
          accountNumber,
          amount,
          cashier: userId,
          transactionType: type,
          oldBalance: findAcct.openingBalance,
          accountBalance: newAmount
        });
        findAcct.openingBalance = newAmount;
      }
      if (type === 'credit') {
        const newAmount = parseFloat(findAcct.openingBalance) + parseFloat(amount);
        accountTransactionsData.push({
          transactionId: randomize('a0', 20),
          accountNumber,
          amount,
          cashier: userId,
          transactionType: type,
          oldBalance: findAcct.openingBalance,
          accountBalance: newAmount
        });
        findAcct.openingBalance = newAmount;
      }
      return res.status(200).json({ stutus: '200', data: accountTransactionsData[accountTransactionsData.length - 1] });
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
