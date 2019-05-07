import express from 'express';
import { tokenVerifier } from '../middleware/authorize';

const checkRoutes = express.Router();

checkRoutes.get('/protectedEndPoints', tokenVerifier);
export default checkRoutes;
