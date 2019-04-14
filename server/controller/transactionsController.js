import randomize from 'randomatic';
import { bankAccounts, accountTransactionsData } from '../data';

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
      return res.status(200).json({ stutus: '200', message: `Your ${type} transaction was successful` });
    }
  }
}

const { debitCredit } = transactionsController;

export default debitCredit;
