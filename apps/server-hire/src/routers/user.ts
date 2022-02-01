import express from 'express';
import login from '@SH/Controllers/user/login';

const router = express.Router();

router.post('/login', login);

export default router;
