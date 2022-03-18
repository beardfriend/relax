import express from 'express';
import getMe from '@SH/Controllers/user/me';
import { loginCheckMiddleWare } from '@SH/MiddleWares/auth';

const router = express.Router();

router.get('/me', loginCheckMiddleWare, getMe);

export default router;
