/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import login from '@SH/Controllers/auth/login';
import signUp from '@SH/Controllers/auth/signUp';
import logout from '@SH/Controllers/auth/logout';
import { getCode, getToken } from '@SH/Controllers/auth/kakao';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import { googleGetCode, googleGetToken } from '@SH/Controllers/auth/google';
import businessCheck from '@SH/Controllers/auth/businessCheck';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);
router.get('/kakao', getCode);
router.get('/kakao/get-token', getToken);
router.get('/google', googleGetCode);
router.get('/google/get-token', googleGetToken);
router.post('/business-check', loginCheckMiddleWare, onlyAcademyAccess, businessCheck);

export default router;
