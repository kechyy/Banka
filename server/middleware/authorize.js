/* eslint-disable valid-jsdoc */
import jwt from 'jsonwebtoken';

class tokenGeneration {
/**
 * Generates a token
*/
  static tokenGenerator(payload) {
    const token = jwt.sign({ payload }, process.env.SECRETKEY, { expiresIn: '24hrs' });
    return token;
  }

  /**
   * Verifies a token
  */
  static tokenVerifier(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Please supply a token'
      });
    }
    const tokenBearer = token.split(' ');

    jwt.verify(tokenBearer[1], process.env.SECRETKEY, (err, userInfo) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid token'
        });
      }
      req.userInfo = userInfo;
      return next();
    });
  }
}
const { tokenGenerator, tokenVerifier } = tokenGeneration;

export { tokenGenerator, tokenVerifier };
