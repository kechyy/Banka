import randomize from 'randomatic';
import { bankAccounts } from '../data';

class accountController {
  static CreateAccount(req, res) {
    req.body.accountNumber = randomize('0', 10);
    req.body.openingBalance = '0.00';
    req.body.status = 'dormant';
    const {
      accountNumber,
      firstName,
      lastName,
      email,
      type,
      openingBalance,
      status
    } = req.body;
    const accountInfo = {
      accountNumber,
      firstName,
      lastName,
      email,
      type,
      openingBalance,
      status
    };
    const checkAcctExist = bankAccounts.filter(acct => acct.email === email)[0];
    if (checkAcctExist) {
      return res.status(409).json({
        status: '409',
        error: 'Account already exist' 
      });
    }
    bankAccounts.push(accountInfo);
    const data = bankAccounts[bankAccounts.length - 1];
    return res.status(201).json({ status: '201', data });
  }

  static updateAccount(req, res) {
    const { accountNumber } = req.params;
    const confirmAcctNumber = bankAccounts.filter(acct => acct.accountNumber === accountNumber)[0];
    if (confirmAcctNumber) {
      if (confirmAcctNumber.status === 'active') {
        confirmAcctNumber.status = 'dormant';
        const { status, accountNumber } = confirmAcctNumber;
        return res.status(200).json({status: '200', data: { status, accountNumber } });
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

export  {CreateAccount, updateAccount, deleteAccount };
