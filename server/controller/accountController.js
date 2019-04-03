import {bankAccounts} from '../data';
import randomize from 'randomatic';

class accountController {

    static account(req, res){
        req.body.accountNumber = randomize('0',10);
        req.body.openingBalance = '0.00';
        req.body.status = 'dormant';
        
        const {accountNumber, firstName, lastName, email, type, openingBalance, status} = req.body
        const accountInfo = {accountNumber, firstName, lastName, email, type, openingBalance, status}
        
        const checkAcctExist = bankAccounts.find(acct=>acct.email === email)
        if(checkAcctExist !== undefined) {
            return  res.status(409).json({
                "status": '409',
                "error": 'Account already exist' 
            })
        }
        bankAccounts.push(accountInfo)
        const data = bankAccounts[bankAccounts.length - 1];
        return res.status(201).json({status:'201', data});

    }

    static updateAccount(req, res){
        const {accountNumber} = req.params;
        const confirmAcctNumber = bankAccounts.find(acct=> acct.accountNumber === accountNumber);
        
        if(confirmAcctNumber !== undefined){
            
            if(confirmAcctNumber.status == 'active'){
                confirmAcctNumber.status = 'dormant';
                const {status, accountNumber} = confirmAcctNumber;
                return res.status(200).json({status:'200', data:{status, accountNumber}});
            }
            if(confirmAcctNumber.status == 'dormant'){
                confirmAcctNumber.status = 'active';
                const {status, accountNumber} = confirmAcctNumber;
                return res.status(200).json({status:'200', data:{status, accountNumber}});
            }
            
        }
        return res.status(404).json({
            status: '404',
            error: 'Invalid account number'
        });

    }

}

const {account, updateAccount} = accountController;

export  {account, updateAccount};