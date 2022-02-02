import request from 'supertest';
import dotenv from 'dotenv';
import { createConnection, getManager } from 'typeorm';
import initExpress from '@SH/Initializations/express/initExpress';

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
  });
  const app = initExpress();

  test('signup', async () => {
    const res = await request(app).post('/user/signup').send({ email: 'asd@naver.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });
  test('login', async () => {
    const res = await request(app).post('/user/login').send({ email: 'asd@naver.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });

  test('logout', async () => {
    const res = await request(app).get('/user/logout');
    expect(res.statusCode).toEqual(200);
    console.log(res.headers);
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
