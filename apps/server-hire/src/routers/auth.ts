/* eslint-disable @typescript-eslint/no-unused-vars */
import businessCheck from '@SH/Controllers/auth/businessCheck';
import { googleGetCode, googleGetToken } from '@SH/Controllers/auth/google';
import { getCode, getToken } from '@SH/Controllers/auth/kakao';
import login from '@SH/Controllers/auth/login';
import logout from '@SH/Controllers/auth/logout';
import signUp from '@SH/Controllers/auth/signUp';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import express from 'express';
import validatorFunc from '@SH/MiddleWares/validator';
import { UserDto } from '@Libs/dto/user';
import { AcadmeyBusinessDto } from '@Libs/dto/academy';

const router = express.Router();

router.post('/login', validatorFunc(UserDto, { groups: ['login'] }), login);
router.post('/signup', validatorFunc(UserDto, { groups: ['signup'] }), signUp);
router.get('/logout', logout);
router.get('/kakao', getCode);
router.get('/kakao/get-token', getToken);
router.get('/google', googleGetCode);
router.get('/google/get-token', googleGetToken);
router.post(
  '/business-check',
  loginCheckMiddleWare,
  onlyAcademyAccess,
  validatorFunc(AcadmeyBusinessDto),
  businessCheck
);

export default router;
