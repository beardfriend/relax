import express from 'express';
import getTeacherProfile from '@SH/Controllers/profile/teacher';
import { loginCheckMiddleWare, onlyTeacherAccess } from '@SH/MiddleWares/auth';

const router = express.Router();

router.get('/teacher', loginCheckMiddleWare, onlyTeacherAccess, getTeacherProfile);

export default router;
