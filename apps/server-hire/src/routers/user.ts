import express from 'express';
import login from '@SH/Controllers/user/login';
import signUp from '@SH/Controllers/user/signUp';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

export default router;
