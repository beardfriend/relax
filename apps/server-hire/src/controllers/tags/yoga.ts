import { Request, Response } from 'express';
import { getYogaTagsSuccess } from '@Libs/constants/messages/tags';
import { getManager } from 'typeorm';

export default async function yoga(req: Request, res: Response) {
  const manager = getManager();
  const data = await manager.query(`SELECT * FROM yoga_tags WHERE name LIKE '%${req.query.search}%'`);
  return res.status(getYogaTagsSuccess.statusCode).send({
    msg: getYogaTagsSuccess.message,
    category: getYogaTagsSuccess.category,
    data,
  });
}
