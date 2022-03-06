import initExpress from '@SH/Initializations/express/initExpress';
import env from '@SH/env';
import request from 'supertest';
import { createConnection, getManager } from 'typeorm';

describe('회원가입 -> Role 선택 -> 비즈니스 인증 -> 프로필 생성됐는지 체크', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'postgres',
      host: env.typeorm.host,
      port: env.typeorm.port,
      username: env.typeorm.username,
      password: env.typeorm.password,
      database: env.typeorm.database,
      synchronize: env.typeorm.sync,
      logging: env.typeorm.logging,
      entities: [env.typeorm.entities],
    });
  });

  const app = initExpress();
  const agent = request.agent(app);
  describe('POST /auth/signup', () => {
    it('일반유저 회원가입 및 토큰 던지기', async () => {
      const res = await agent.post('/auth/signup').send({ email: 'asd@naver.com', password: 'password' });
      expect(res.statusCode).toEqual(200);
    });
  });
  describe('POST /role', () => {
    it('학원 유형 선택', async () => {
      const res = await agent.post('/role').send({ role: 'ACADEMY' });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('POST /auth/business-check', () => {
    it('비즈니스 등록', async () => {
      const res = await agent
        .post('/auth/business-check')
        .send({ businessNumber: '1088178306', representationName: '권영민', openDate: '20070207' });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('프로필 생성여부 체크', () => {
    it('프로필 생성 조회', async () => {
      const manager = getManager();
      const result = await manager.query(`
        SELECT * FROM academy a
          INNER JOIN academy_business b
          ON b.id = a."businessInfoId"
      `);
      console.log(result);
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
