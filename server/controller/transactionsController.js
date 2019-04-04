import {bankAccounts,accountTransactionsData} from '../data';
import randomize from 'randomatic';

class transactionsController {
    static debitCredit(req, res){
        const {accountNumber, type} = req.params;
        let {amount} = req.body;
        const findAcct = bankAccounts.find(acct=>acct.accountNumber === accountNumber);
        if(findAcct !== undefined) {
            if(type === "debit"){
                if(amount > findAcct.openingBalance){
                    return res.status(400).json({
                      status: "400",
                      error: `Insufficient account balance: [${findAcct.openingBalance}]`
                    });
                  }
                  const newAmount = parseFloat(findAcct.openingBalance)  - parseFloat(amount);
                  accountTransactionsData.push({
                    transactionId: randomize('a0', 20),
                    accountNumber,
                    amount,
                    cashier: 1,
                    transactionType: type,
                    oldBalance: findAcct.openingBalance,
                    accountBalance: newAmount
                  });
                  findAcct.openingBalance = newAmount;
            }
            if(type === "credit"){
                  const newAmount = parseInt(findAcct.openingBalance)  +  parseInt(amount);
                  accountTransactionsData.push({
                    transactionId: randomize('a0', 20),
                    accountNumber,
                    amount,
                    cashier: 1,
                    transactionType: type,
                    oldBalance: findAcct.openingBalance,
                    accountBalance: newAmount
                  });
                  findAcct.openingBalance = newAmount;
            }
            
           return  res.status(200).json({stutus:'200', data: accountTransactionsData[accountTransactionsData.length - 1]});
      
        }
    }
}

const {debitCredit} = transactionsController;

export  default debitCredit;