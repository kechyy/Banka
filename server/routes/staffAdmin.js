import express from 'express';
// eslint-disable-next-line import/named
import { updateAccount, deleteAccount } from '../controller/staffAdminController';
import {
  accountUpdateValidate, accountDeleteValidate
} from '../middleware/staffAdminValidation';
import { tokenVerifier } from '../middleware/authorize';
import { staffAdminCheck } from '../middleware/checkers';

const staffAdminRoutes = express.Router();


staffAdminRoutes.patch('/account/:accountNumber', accountUpdateValidate, tokenVerifier, staffAdminCheck, updateAccount);
staffAdminRoutes.delete('/accounts/:accountNumber', accountDeleteValidate, tokenVerifier, staffAdminCheck, deleteAccount);
export default staffAdminRoutes;
