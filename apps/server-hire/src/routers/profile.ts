import express from 'express';
import academyProfile, { getAcademyProfile } from '@SH/Controllers/profile/academyProfile';
import { loginCheckMiddleWare, onlyAcademyAccess, onlyTeacherAccess } from '@SH/MiddleWares/auth';
import { academyMulter, teacherMulter } from '@SH/MiddleWares/multer';
import validatorFunc from '@SH/MiddleWares/validator';
import { AcademyProfilePostDto } from '@Libs/dto/academy';
import putTeacherProfile, { getTeacherProfile } from '@SH/Controllers/profile/teacherProfile';

const router = express.Router();

router.put(
  '/academy',
  loginCheckMiddleWare,
  academyMulter,
  onlyAcademyAccess,
  validatorFunc(AcademyProfilePostDto),
  academyProfile
);
router.get('/academy', loginCheckMiddleWare, onlyAcademyAccess, getAcademyProfile);

router.put('/teacher', loginCheckMiddleWare, teacherMulter, onlyTeacherAccess, putTeacherProfile);
router.get('/teacher', loginCheckMiddleWare, onlyTeacherAccess, getTeacherProfile);
export default router;
