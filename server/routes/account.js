import express from 'express';
import {account, updateAccount} from '../controller/accountController';
import accountValidate from '../middleware/accountValidation';
const accountRouter = express.Router();


 accountRouter.post('/account', accountValidate, account);
 accountRouter.put('/account/:accountNumber', updateAccount);
 

 export default accountRouter;