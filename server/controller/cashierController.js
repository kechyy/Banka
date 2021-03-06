import randomize from 'randomatic';
import pool from '../db/connection';
import { transactions, updateAccount, getAcctStatus } from '../db/queryTables';
import { computeNewBalance } from '../middleware/customFunction';

class cashierController {
  static async debitCredit(req, res) {
    const { userid } = req.userInfo;
    const { accountNumber, type } = req.params;
    const {
      amount, payeeName, payeePhone, transactionType
    } = req.body;
    try {
      const findAcct = await pool.query(getAcctStatus, [accountNumber]); 

      if (findAcct.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Acount number does not exist '
        });
      }
      if (findAcct.rows[0].account_status === 'dormant') {
        return res.status(404).json({
          status: 400,
          error: "Can't persform transaction on a dormant account"
        });
      }
      if (findAcct.rowCount === 1) {
        if (type === 'debit') {
          if (parseFloat(amount) > parseFloat(findAcct.rows[0].balance)) {
            return res.status(400).json({
              status: 400,
              error: `Insufficient account balance: [${findAcct.rows[0].balance}]`
            });
          }
        }
        const newBalance = parseFloat(computeNewBalance(type, findAcct, amount));

        const oldBalance = parseFloat(findAcct.rows[0].balance);
        const transactionId = randomize('a0', 20);
        const date = new Date();
        const transactionDate = date;
        const transactionDetails = [accountNumber, transactionId,
          transactionDate, userid,
          amount, type, oldBalance, newBalance, payeeName,
          payeePhone, 2345677881, transactionType];
        const computeTrasaction = await pool.query(transactions, transactionDetails);
        await pool.query(updateAccount, [newBalance, findAcct.rows[0].account_number]);
        return res.status(201).json({
          status: 201, data: computeTrasaction.rows[0]
        });
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async viewAllTransactions(req, res) {
    try {
      const query = await pool.query('SELECT * FROM transactions');
      if (query.rowCount > 0) {
        return res.status(200).json({ status: 200, data: query.rows });
      }
      return res.status(404).json({ status: 404, error: 'No record found' });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}


const { debitCredit, viewAllTransactions } = cashierController;
export { debitCredit, viewAllTransactions };
