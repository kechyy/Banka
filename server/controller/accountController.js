
import {bankAccounts} from '../data';

class accountController {

    static account(req, res){
        req.body.accountNumber = '';
        req.body.openingBalance = '0.00';
        const {accountNumber, firstName, lastName, email, type, openingBalance} = req.body
        const accountInfo = {accountNumber, firstName, lastName, email, type, openingBalance}
        const checkAcctExist = bankAccounts.find(acct=>acct.email === email)
        if(checkAcctExist !== undefined) {
            return  res.status(500).json({
                "status": '500',
                "error": 'Account already exist' 
            })
        }
        bankAccounts.push(accountInfo)
        const data = bankAccounts[bankAccounts.length - 1];
        return res.json({status:'201', data})
    }

}

const {account} = accountController;

export default account;