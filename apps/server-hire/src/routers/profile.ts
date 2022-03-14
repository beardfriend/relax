import express from 'express';
import academyProfile, { academyProfileGet } from '@SH/Controllers/profile/academyProfile';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import { academyMulter } from '@SH/MiddleWares/multer';

const router = express.Router();

router.put('/academy', loginCheckMiddleWare, academyMulter, onlyAcademyAccess, academyProfile);
router.get('/academy', loginCheckMiddleWare, onlyAcademyAccess, academyProfileGet);
export default router;
