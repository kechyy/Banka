class transactionsValidation {
  static debitCreditValidate(req, res, next) {
    let { accountNumber, type } = req.params;
    let { amount, transactionType, payeeName, payeePhone, payeeAcctNumber } = req.body;
    accountNumber = accountNumber.trim();
    type = type.trim();

    if (!/^[0-9]{10}$/.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Account number must be 10 digit number'
      });
    }
    if (type !== 'debit' && type !== 'credit') {
      return res.status(400).json({
        status: '400',
        error: 'Transaction type must be debit or credit'
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
    payeeName = payeeName.trim();
    payeePhone = payeePhone.trim();
    payeeAcctNumber = payeeAcctNumber.trim();
    amount = amount.trim();
    transactionType = transactionType.trim();

    if (!/[0-9]$/.test(amount)) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount must be a number'
      });
    }
    if (amount < 1) {
      return res.status(400).json({
        status: '400',
        error: 'Transaction amount is not sufficient enough'
      });
    }
    if (type === 'credit' && transactionType === 'transfer') {
      if (!payeeAcctNumber || !payeeName || !payeePhone) {
        return res.status(400).json({
          status: '400',
          error: 'Please supply all payee details'
        });
      }
    }
    req.body.transactionType = transactionType;
    req.body.payeeAcctNumber = payeeAcctNumber;
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
