import express from 'express';
import login from '@SH/Controllers/user/login';
import signUp from '@SH/Controllers/user/signUp';
import logout from '@SH/Controllers/user/logout';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);

export default router;
