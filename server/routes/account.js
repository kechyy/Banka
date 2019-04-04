import express from 'express';
import {account, updateAccount, deleteAccount} from '../controller/accountController';
import {accountValidate, accountUpdateValidate, accountDeleteValidate} from '../middleware/accountValidation';
const accountRouter = express.Router();

 accountRouter.post('/account', accountValidate, account);
 accountRouter.patch('/account/:accountNumber', accountUpdateValidate, updateAccount);
 accountRouter.delete('/account/:accountNumber', accountDeleteValidate, deleteAccount);
 

 export default accountRouter;