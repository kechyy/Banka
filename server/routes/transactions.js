import express from 'express';
import debitCredit from '../controller/transactionsController';
import { tokenVerifier } from '../middleware/authorize';
import debitCreditValidate from '../middleware/transactionsValidation';

const transactionsRouter = express.Router();

transactionsRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, tokenVerifier, debitCredit);

export default transactionsRouter;
