// import User from '@SH/Entities/user/user';
import { Response, Request } from 'express';
// import { findUser } from '@SH/Services/user/user';
async function selectType(req: Request, res: Response) {
  console.log(req.type, req.user);
  console.log('test');
  return res.send('hello');
}

export default selectType;
