import express from 'express';
import account from '../controller/accountController';
import accountValidate from '../middleware/accountValidation';
const accountRouter = express.Router();


 accountRouter.post('/account', accountValidate, account);
 

 export default accountRouter;