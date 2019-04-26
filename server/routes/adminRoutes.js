import express from 'express';
import updateUserController from '../controller/adminController';
import updateUserValidation from '../middleware/adminValidation';

const adminRouter = express.Router();

adminRouter.post('/user/:userid', updateUserValidation, updateUserController);
export default adminRouter;
