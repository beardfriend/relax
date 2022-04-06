import { RecruitmentDto } from '@Libs/dto/recruitment';
import postRecruitment from '@SH/Controllers/recruitment/recruitment';
import { loginCheckMiddleWare, onlyAcademyAccess } from '@SH/MiddleWares/auth';
import validatorFunc from '@SH/MiddleWares/validator';
import express from 'express';

const router = express.Router();
router.post('', loginCheckMiddleWare, onlyAcademyAccess, validatorFunc(RecruitmentDto), postRecruitment);
export default router;
