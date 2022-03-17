import express from 'express';
import academyProfile, { academyProfileGet } from '@SH/Controllers/profile/academyProfile';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import { academyMulter } from '@SH/MiddleWares/multer';
import validatorFunc from '@SH/MiddleWares/validator';
import { AcademyProfilePostDto } from '@Libs/dto/academy';

const router = express.Router();

router.put(
  '/academy',
  loginCheckMiddleWare,
  academyMulter,
  onlyAcademyAccess,
  validatorFunc(AcademyProfilePostDto),
  academyProfile
);
router.get('/academy', loginCheckMiddleWare, onlyAcademyAccess, academyProfileGet);
export default router;
