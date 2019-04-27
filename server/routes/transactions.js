import express from 'express';
import debitCredit from '../controller/transactionsController';
import { tokenVerifier } from '../middleware/authorize';
import { cashierCheck } from '../middleware/checkers';
import debitCreditValidate from '../middleware/transactionsValidation';

const transactionsRouter = express.Router();

transactionsRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, tokenVerifier, cashierCheck, debitCredit);

export default transactionsRouter;
