import express from 'express';
import yoga from '@SH/Controllers/tags/yoga';

const router = express.Router();

router.get('/yoga', yoga);

export default router;
