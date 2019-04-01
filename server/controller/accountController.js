
import {bankAccounts} from '../data';

class accountController {

    static account(req, res){
        const {accountNumber, firstName, lastName, email, type, openingBalance} = req.body
        const accountInfo = {accountNumber, firstName, lastName, email, type, openingBalance}
        bankAccounts.push(accountInfo)
        const data = bankAccounts[1];
        return res.json({ "status":"201", data })
    }

}

const {account} = accountController;

export default account;