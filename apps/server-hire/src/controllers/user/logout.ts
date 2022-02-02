import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function logout(req: Request, res: Response) {
  const cookies = req.headers.cookie;

  if (cookies === undefined || process.env.JWT === undefined) {
    return res.status(500).send({ msg: '서버 장애' });
  }
  const cookie = cookies.split('; ');
  const data = cookie.filter((datas) => !datas.indexOf('relaxLogin'));

  if (data.length === 0) {
    return res.status(400).send({ msg: '발급된 토큰 없음' });
  }

  const relaxLoginToken = data[0].split('=')[1];

  try {
    await jwt.verify(relaxLoginToken, process.env.JWT);
    res.cookie('relaxLogin', '', { maxAge: 0, httpOnly: true });
    return res.send({ msg: '로그아웃 됨' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: '토큰 키 불일치' });
  }
}

export default logout;
