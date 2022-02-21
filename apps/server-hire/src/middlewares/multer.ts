import multer from 'multer';

export const upload = multer({ dest: 'uploads/' });

export const academyMulter = upload.fields([
  { name: 'ACADEMY_LOGO', maxCount: 1 },
  { name: 'ACADEMY_INTRODUCE', maxCount: 5 },
]);
