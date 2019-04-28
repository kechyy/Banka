import express from 'express';
import debitCredit from '../controller/cashierController';
import { tokenVerifier } from '../middleware/authorize';
import { cashierCheck } from '../middleware/checkers';
import debitCreditValidate from '../middleware/cashierValidation';

const cashierRouter = express.Router();

cashierRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, tokenVerifier, cashierCheck, debitCredit);


export default cashierRouter;
