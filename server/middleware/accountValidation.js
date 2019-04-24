/* eslint-disable object-curly-newline */
class accountValidation {
  static accountValidate(req, res, next) {
    let { type } = req.body;
    
    if (type === '' || type === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'User type is required'
      });
    }
    if (type !== 'savings' && type !== 'current') {
      return res.status(400).json({
        status: 400,
        error: 'Account type must be either savings or current account'
      });
    }
    req.body.type = type;
    next();
  }

  static accountUpdateValidate(req, res, next) {
    let { accountNumber } = req.params;
    accountNumber = accountNumber.trim();
    if (!/^[0-9]{10}$/.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Account number must be 10 digit number'
      });
    }
    req.params.accountNumber = accountNumber;
    next();
  }

  static accountDeleteValidate(req, res, next) {
    let { accountNumber } = req.params;
    accountNumber = accountNumber.trim();
    if (!/^[0-9]{10}$/.test(accountNumber)) {
      return res.status(400).json({
        status: '400',
        error: 'Account number must be 10 digit number'
      });
    }
    req.params.accountNumber = accountNumber;
    next();
  }
}
const { accountValidate, accountUpdateValidate, accountDeleteValidate } = accountValidation;
export { accountValidate, accountUpdateValidate, accountDeleteValidate };
