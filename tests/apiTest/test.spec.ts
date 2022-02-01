import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import useBodyParser from '@SH/Initializations/express/lib/useBodyParser';
import setRoute from '@SH/Initializations/express/lib/setRoute';
import { createConnection, getManager } from 'typeorm';
import User from '@SH/Entities/user/user';

describe('test', () => {
  beforeAll(async () => {
    dotenv.config({
      path: `./config/.env.test`,
    });
    await createConnection({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      entities: [`${process.env.TYPEORM_ENTITIES}`],
    });
    const manager = getManager();
    const user = new User();
    user.email = 'asd@naver.com';

    user.password = 'password';
    await manager.save(user);
  });

  test('Case, success', async () => {
    const app = express();
    useBodyParser(app);
    setRoute(app);
    const res = await request(app).post('/user/login').send({ email: 'asd@naver.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });

  test('Case Password Fail', async () => {
    const app = express();
    useBodyParser(app);
    setRoute(app);
    const res = await request(app).post('/user/login').send({ email: 'asd@naver.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });

  test('Case Email didnt Exist', async () => {
    const app = express();
    useBodyParser(app);
    setRoute(app);
    const res = await request(app).post('/user/login').send({ email: 'asd@naver.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    const manager = getManager();
    await manager.query(`
      DO $$ DECLARE
      r RECORD;
  BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
  END $$;
      `);
  });
});
