/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import { updateAccountDb, getAcctStatus, delAccount } from '../db/queryTables';
import pool from '../db/connection';
import { updatAcions } from '../middleware/customFunction';

class staffAdminController {
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
      return res.status(404).json({ status: 404, error: 'Something went wrong, please ensure the account supplied is valid' });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async viewSpecificOwnedAccounts(req, res) {
    const { email } = req.params;
    try {
      const getAccounts = await pool.query('SELECT account_number, created_on, email, account_type, account_status, balance FROM account WHERE email=$1', [email]);
      if (getAccounts.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'Something went wrong, please ensure the email supplied is valid' });
      }
      return res.status(200).json({ status: 200, data: getAccounts.rows });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}

const { updateAccount, deleteAccount, viewSpecificOwnedAccounts } = staffAdminController;

export { updateAccount, deleteAccount, viewSpecificOwnedAccounts };
