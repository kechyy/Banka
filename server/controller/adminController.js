import pool from '../db/connection';

class AdminController {
  static async updateUserController(req, res) {
    const { usertype } = req.body;
    const { userid } = req.params;
    try {
      const updateUsertype = await pool.query('UPDATE users SET usertype=$1, isadmin=$2 WHERE id=$3', [usertype, true, userid]);
      if (updateUsertype.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          error: 'Usertype successfully updated'
        });
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}
const { updateUserController } = AdminController;
export default updateUserController;
