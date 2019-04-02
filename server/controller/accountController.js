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