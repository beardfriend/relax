import express from 'express';
import login from '@SH/Controllers/user/login';
import signUp from '@SH/Controllers/user/signUp';
import logout from '@SH/Controllers/user/logout';
import { getCode, getToken } from '@SH/Controllers/user/kakao';
import selectType from '@SH/Controllers/user/selectType';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import { googleGetCode, googleGetToken } from '@SH/Controllers/user/google';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);
router.get('/kakao', getCode);
router.get('/kakao/get-token', getToken);
router.get('/google', googleGetCode);
router.get('/google/get-token', googleGetToken);
router.get('/select-type', loginCheckMiddleWare, selectType);
router.post('/business-check', loginCheckMiddleWare, onlyAcademyAccess);

export default router;
