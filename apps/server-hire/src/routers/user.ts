/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import login from '@SH/Controllers/user/login';
import signUp from '@SH/Controllers/user/signUp';
import logout from '@SH/Controllers/user/logout';
import { getCode, getToken } from '@SH/Controllers/user/kakao';
import selectType from '@SH/Controllers/user/selectType';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import { googleGetCode, googleGetToken } from '@SH/Controllers/user/google';
import businessCheck from '@SH/Controllers/user/businessCheck';
import academyProfile from '@SH/Controllers/user/academyProfile';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

const multers = upload.fields([
  { name: 'ACADEMY_LOGO', maxCount: 1 },
  { name: 'ACADEMY_INTRODUCE', maxCount: 5 },
]);

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);
router.get('/kakao', getCode);
router.get('/kakao/get-token', getToken);
router.get('/google', googleGetCode);
router.get('/google/get-token', googleGetToken);
router.post('/select-type', loginCheckMiddleWare, selectType);
router.post('/business-check', loginCheckMiddleWare, onlyAcademyAccess, businessCheck);
router.post('/academy-profile', loginCheckMiddleWare, onlyAcademyAccess, multers, academyProfile);

export default router;
