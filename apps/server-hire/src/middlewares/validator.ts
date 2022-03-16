import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validatorFunc(validator: ClassConstructor<object>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const test = plainToClass(validator, req.body);
    console.log(test);
    validate(test).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
        return res.send(errors);
      }
      console.log('validation succeed');
      return next();
    });
  };
}

export default validatorFunc;