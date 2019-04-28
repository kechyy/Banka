/* eslint-disable object-curly-newline */
class accountValidation {
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
const { accountUpdateValidate, accountDeleteValidate } = accountValidation;
export { accountUpdateValidate, accountDeleteValidate };
