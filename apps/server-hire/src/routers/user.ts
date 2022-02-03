import express from 'express';
import login from '@SH/Controllers/user/login';
import signUp from '@SH/Controllers/user/signUp';
import logout from '@SH/Controllers/user/logout';
import { getCode, getToken } from '@SH/Controllers/user/kakao';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);
router.get('/kakao', getCode);
router.get('/kakao/get-token', getToken);

export default router;
