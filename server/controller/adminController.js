import bcrypt, { compareSync } from 'bcrypt';
import randomize from 'randomatic';
import url from 'url';
import pool from '../db/connection';
import { tokenGenerator } from '../middleware/authorize';
import { adminCreateUser } from '../db/queryTables';
import mailer from '../misc/mailer';

class AdminController {
  static async adminSignUpController(req, res) {
    const {
      firstName, lastName, email, usertype
    } = req.body;
    const password = randomize('a0', 32);
    const userActivationCode = randomize('a0', 32);
    const userEmailStatus = 'not verified';
    try {
      const query = await pool.query(adminCreateUser,
        [firstName, lastName, email, bcrypt.hashSync(password, 10),
          userActivationCode, userEmailStatus, usertype]);
      const token = tokenGenerator({
        userid: query.rows[0].id,
        firstName: query.rows[0].firstname,
        email: query.rows[0].email,
        usertype: query.rows[0].usertype
      });
      query.rows[0].token = token;
      const requrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
      });
      const html = `<p>Hi ${firstName}</p>
      <p>Thank you for Registering .</p><p>Please Open this link to verify your email address -
      <a href="${requrl}/emailVerification.html?activation_code=${userActivationCode}">Verify Now</a>
      <p>Best Regards,<br />${firstName} ${lastName}</p>`;
      // Send the email
      const mailSent = await mailer.sendEmail('kech3443@gmail.com', email, 'Email Verification', html);
      console.log(mailSent);
      return res.status(201).json({ status: 201, data: query.rows });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async updateUserController(req, res) {
    const { usertype } = req.body;
    const { userid } = req.params;
    try {
      const confirmUserID = await pool.query('SELECT id FROM users WHERE id=$1', [userid]);
      if (confirmUserID.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'Userid not found' });
      }
      const updateUsertype = await pool.query('UPDATE users SET usertype=$1, isadmin=$2 WHERE id=$3', [usertype, true, userid]);
      if (updateUsertype.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          data: 'Usertype successfully updated'
        });
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async usersController(req, res) {
    try {
      const users = await pool.query('SELECT * FROM users');
      if (users.rowCount === 0) {
        return res.status(404).json({ status: '404', error: 'No Record Found' });
      }
      return res.status(200).json({
        status: 200,
        data: users.rows
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}
const { updateUserController, usersController, adminSignUpController } = AdminController;
export { updateUserController, usersController, adminSignUpController };
