import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';

async function beforeInit() {
  dotenv.config({
    path: `./config/.env.test`,
  });
  const app = express();
  const port = process.env.EXPRESS_PORT;
  app.set('port', port);
  app.listen(port);

  await createConnection({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    entities: [`${process.env.TYPEORM_TEST_TYPEORM_ENTITIES}`],
  });
}

export default beforeInit;
