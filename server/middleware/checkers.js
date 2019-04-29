import pool from '../db/connection';

class Checkers {
  static adminCheck(req, res, next) {
    const { userid, usertype } = req.userInfo;
    if (usertype === 'admin') {
      const confirmUser = pool.query('SELECT id FROM users WHERE id = $1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this admin' });
      }
      return next();
    }
    return res.status(401).json({ status: '401', error: 'Unauthorized User, Please contact the administrator.' });
  }

  static cashierCheck(req, res, next) {
    const { userid, usertype } = req.userInfo;
    console.log(usertype);
    if (usertype === 'cashier') {
      const confirmUser = pool.query('SELECT id FROM users WHERE id = $1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this cashier' });
      }
      return next();
    }
    return res.status(401).json({ status: '401', error: 'Unauthorized User. Please contact the administrator' });
  }

  static staffAdminCheck(req, res, next) {
    const { userid, usertype } = req.userInfo;

    if (usertype === 'staffAdmin') {
      const confirmUser = pool.query('SELECT id FROM users WHERE id=$1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this staff admin' });
      }
      return next();
    }
    return res.status(401).json({ status: '401', error: 'Unauthorized User. please contact the administrator' });
  }

  static userCheck(req, res, next) {
    const { usertype, userid } = req.userInfo;
    if (usertype === 'client') {
      const confirmUser = pool.query('SELECT id FROM users WHERE id = $1', [userid]);
      if (confirmUser.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Invalid User ID for this user' });
      }
      return next();
    }
    return res.status(401).json({ status: '401', error: 'You must be a user to access this application' });
  }
}

const {
  adminCheck, cashierCheck, staffAdminCheck, userCheck
} = Checkers;
export {
  adminCheck, cashierCheck, staffAdminCheck, userCheck
};
