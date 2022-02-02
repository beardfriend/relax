import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Reqlogout {
  relaxLogin: string;
}

async function logout(req: Request, res: Response) {
  const { relaxLogin }: Reqlogout = req.cookies;
  if (process.env.JWT === undefined) {
    return res.status(500).send({ msg: '서버 장애' });
  }

  const isOurToken = await jwt.verify(relaxLogin, process.env.JWT);
  if (isOurToken) {
    res.cookie('relaxLogin', { signed: true, maxAge: 0, httpOnly: true });
    return res.send({ msg: '로그아웃 됨' });
  }
  return res.status(400).send({ msg: '토큰 불일치' });
}

export default logout;
