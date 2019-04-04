
class transactionsValidation {
  static debitCreditValidate(req, res, next){
    let {accountNumber, type } = req.params;
    let {amount} = req.body;
    
    accountNumber = accountNumber.trim();
    type = type.trim();

    if(! /^[0-9]{10}$/.test(accountNumber)) {
      return res.status(400).json({
        status: '400',
        error: 'Account number must be 10 digit number' 
      })  
    }
    if(type !== "debit" && type !== "credit"){
      return res.status(400).json({
        status: '400',
        'error': 'Transaction type must be debit or credit'
      })
    }
    if(!amount){
      return res.status(400).json({
        status: '400',
        'error': 'Transaction amount field is required'
      })
    }
    amount = amount.trim();
    if(! /[0-9]$/.test(amount)) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount must be an number' 
      })  
    }
    req.params.accountNumber = accountNumber;
    req.params.type = type;
    req.body.amount = amount;
    next();
  }

}
const {debitCreditValidate} = transactionsValidation;
export  default debitCreditValidate;