class transactionsValidation {
  static debitCreditValidate(req, res, next) {
    let { accountNumber, type } = req.params;
    let {
      amount, transactionType, payeeName, payeePhone
    } = req.body;
    if (!accountNumber) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction Account number field is required'
      });
    }
    if (!payeeName) {
      return res.status(400).json({
        status: '400',
        error: 'Payee name field is required'
      });
    }
    if (!payeePhone) {
      return res.status(400).json({
        status: '400',
        error: 'Payee phone field is required'
      });
    } 
    if (!amount) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount field is required'
      });
    }
    if (!transactionType) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction type can either be transfer, cashout or cheque'
      });
    }
    accountNumber = accountNumber.trim();
    type = type.trim();
    amount = amount.trim();
    payeeName = payeeName.trim();
    payeePhone = payeePhone.trim();
    transactionType = transactionType.trim();

    if (!/^[0-9]{10}$/.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction account number must be 10 digit number'
      });
    }
    if (!/^([A-Za-z]){2,25}$/.test(payeeName)) {
      return res.status(400).json({
        status: '400',
        error: 'Payee name field is required'
      });
    }
    if (!/^[0-9]{12}$/.test(payeePhone)) {
      return res.status(400).json({
        status: '400',
        error: 'Phone number must be 12 digit'
      });
    }
    if (type !== 'debit' && type !== 'credit') {
      return res.status(400).json({
        status: '400',
        error: 'Transaction type must be debit or credit'
      });
    }
    // payeeName = payeeName.trim();
    // payeePhone = payeePhone.trim();
    // payeeAcctNumber = payeeAcctNumber.trim();
    // amount = amount.trim();
    // transactionType = transactionType.trim();

    if (!/[0-9]$/.test(amount)) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount must be a number'
      });
    }
    if (amount < 1) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount cannot be a negative value'
      });
    }
    
    req.body.transactionType = transactionType;
    req.body.payeeName = payeeName;
    req.body.payeePhone = payeePhone;
    req.params.accountNumber = accountNumber;
    req.params.type = type;
    req.body.amount = amount;
    next();
  }
}
const { debitCreditValidate } = transactionsValidation;
export default debitCreditValidate;
