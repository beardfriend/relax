import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWTKEY = process.env.JWT;

export async function verfiyToken(req: Request, res: Response, next: NextFunction) {
  const { relaxLogin } = await req.cookies;

  if (JWTKEY === undefined) {
    res.status(500).send({ msg: '서버 장애' });
    return;
  }

  const isOurToken = await jwt.verify(relaxLogin, JWTKEY);
  if (isOurToken) {
    next({ msg: isOurToken });
  }
  next();
}

export async function tokenCheck(req: Request, res: Response, next: NextFunction) {
  const { relaxLogin } = await req.cookies;
  if (JWTKEY === undefined) {
    res.status(500).send({ msg: '서버 장애' });
    return;
  }
  const isOurToken = await jwt.verify(relaxLogin, JWTKEY);
  if (isOurToken) {
    next({ msg: isOurToken });
  }
  next();
}
