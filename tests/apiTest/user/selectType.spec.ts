import { createConnection, getManager, getConnection } from 'typeorm';
import request from 'supertest';
import dotenv from 'dotenv';
import { userType } from '@Libs/constants/types';
import initExpress from '@SH/Initializations/express/initExpress';
import User from '@SH/Entities/user/user';

describe('회원가입, 쿠키, 유저 유형 선택 Flow', () => {
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
  const agent = request.agent(app);
  describe('POST /user/signup', () => {
    it('일반유저 회원가입 및 토큰 던지기', async () => {
      const res = await agent.post('/user/signup').send({ email: 'asd@naver.com', password: 'password' });
      expect(res.statusCode).toEqual(200);
    });
  });
  describe('GET /user/select-type', () => {
    test('선생님 유형 선택', async () => {
      const res = await agent.get('/user/select-type').query({ selectedType: userType.TEACHER });
      expect(res.statusCode).toEqual(200);
    });

    it('유저 정보 조회', async () => {
      const firstUser = await getConnection().getRepository(User).createQueryBuilder('user').getMany();
      console.log(firstUser);
    });
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
