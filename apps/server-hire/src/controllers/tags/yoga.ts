import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default async function yoga(req: Request, res: Response) {
  const manager = getManager();
  const data = await manager.query(`SELECT * FROM yoga_tags WHERE name LIKE '%${req.query.search}%'`);
  return res.send(data);
}
