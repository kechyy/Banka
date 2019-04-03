import express from 'express';
import {account, updateAccount} from '../controller/accountController';
import {accountValidate, accountUpdateValidate} from '../middleware/accountValidation';
const accountRouter = express.Router();


 accountRouter.post('/account', accountValidate, account);
 accountRouter.patch('/account/:accountNumber', accountUpdateValidate, updateAccount);
 

 export default accountRouter;