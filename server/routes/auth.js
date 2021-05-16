import express from 'express';
import { listAll, signin, signup } from '../controllers/auth.js';

const router = express.Router();


router.post('/signin',signin);
router.post('/signup',signup);
router.get('/users',listAll);


export default router;