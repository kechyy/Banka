import express from 'express';
import { CreateAccount, updateAccount, deleteAccount } from '../controller/accountController';
import { accountValidate, accountUpdateValidate, accountDeleteValidate } from '../middleware/accountValidation';
import { tokenVerifier } from '../middleware/authorize';

const accountRouter = express.Router();

accountRouter.post('/account', accountValidate, tokenVerifier, CreateAccount);
accountRouter.patch('/account/:accountNumber', accountUpdateValidate, tokenVerifier, updateAccount);
accountRouter.delete('/account/:accountNumber', accountDeleteValidate, tokenVerifier, deleteAccount);
export default accountRouter;
