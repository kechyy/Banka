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

  static viewSpecificOwnedAccountsValidation(req, res, next) {
    let { email } = req.params;
    email = email.trim();
    // if (!/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}/.test(email)) {
    //   return res.status(400).json({
    //     status: '400',
    //     error: 'Invalid email format'
    //   });
    // }
    req.params.email = email;
    next();
  }

  static viewActiveBankAcctValiation(req, res, next) {
    let { status } = req.query;

    if (!status) {
      return res.status(400).json({ status: 400, error: 'account status is required' });
    }
    status = status.trim();
    if (status !== 'active' && status !== 'dormant') {
      return res.status(400).json({ status: 400, error: `Invalid account status. Status
      could either be active or dormant` });
    }
    req.query.status = status;
    next();
  }
}
const { accountUpdateValidate, accountDeleteValidate,
  viewSpecificOwnedAccountsValidation, viewActiveBankAcctValiation } = accountValidation;
export { accountUpdateValidate, accountDeleteValidate,
  viewSpecificOwnedAccountsValidation, viewActiveBankAcctValiation };
