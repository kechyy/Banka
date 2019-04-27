import express from 'express';
import { updateUserController } from '../controller/adminController';
import updateUserValidation from '../middleware/adminValidation';
import { tokenVerifier } from '../middleware/authorize';
import { adminCheck } from '../middleware/checkers';


const adminRouter = express.Router();

adminRouter.post('/setuser/:userid', updateUserValidation, tokenVerifier, adminCheck, updateUserController);
//adminRouter.post('/admin/:createUser', updateUserValidation, updateUserController);
export default adminRouter;
