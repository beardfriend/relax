import selectType from '@SH/Controllers/role/selectType';
import { loginCheckMiddleWare } from '@SH/MiddleWares/auth';
import express from 'express';

const router = express.Router();

router.post('', loginCheckMiddleWare, selectType);

export default router;
