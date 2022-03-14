import { validate } from 'class-validator';
import User from '@SH/Entities/user/user';
import { NextFunction, Request, Response } from 'express';

async function validatorFunc(req: Request, res: Response, next: NextFunction) {
  const { email }: User = req.body;
  const user = new User();
  user.email = email;
  validate(user).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
      return res.send('error');
    }
    console.log('validation succeed');
    return next();
  });
}

export default validatorFunc;
