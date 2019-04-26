class AdminValidation {
  static updateUserValidation(req, res, next) {
    let { usertype } = req.body;
    let { userid } = req.params;
    if (!usertype) {
      return res.status(400).json({ statuns: '400', message: 'Usertype field is required' });
    }
    usertype = usertype.trim();
    userid = userid.trim();
    if (usertype !== 'cashier' && usertype !== 'admin staff' && usertype !== 'admin') {
      return res.status(400).json({ statuns: '400', message: 'Invalid usertype' });
    }
    if (!/^[0-9]$/.test(userid)) {
      return res.status(400).json({ statuns: '400', message: 'userid must be a number' });
    }
    req.body.usertype = usertype;
    req.params.userid = userid;
    next();
  }
}
const { updateUserValidation } = AdminValidation;
export default updateUserValidation;
