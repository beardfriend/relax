import initExpress from '@SH/Initializations/express/initExpress';
import env from '@SH/env';
import request from 'supertest';
import { createConnection, getManager } from 'typeorm';
import { findTeacherProfile } from '@SH/Services/profile/teacher';

describe('선생님 프로필', () => {
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
      const res = await agent.post('/role').send({ role: 'TEACHER' });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('PUT /profile/teacher', () => {
    it('전체 프로필 등록', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'name')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('yoga', 'HATA')
        .attach('TEACHER_PROFILE', './tests/public/logo.png');
      expect(res.statusCode).toEqual(201);
    });

    it('프로필 업데이트 요가리스트 Delete All', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'academyName')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323');
      expect(res.statusCode).toEqual(201);
      const profile = await findTeacherProfile({ uniqueKey: 'asd@naver.com', loginType: 'normal' });
      expect(profile.teacher.teacherProfile.yoga.length).toBe(0);
    });

    it('프로필 업데이트 요가 1개 Update', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'name')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323')
        .field('yoga', 'IYENGAR');
      expect(res.statusCode).toEqual(201);
      const profile = await findTeacherProfile({ uniqueKey: 'asd@naver.com', loginType: 'normal' });
      expect(profile.teacher.teacherProfile.yoga.length).toBe(1);
    });

    it('프로필 이미지 지우기', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'name')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('isDeleteProfileImage', 'true');
      expect(res.statusCode).toEqual(201);

      const profile = await findTeacherProfile({ uniqueKey: 'asd@naver.com', loginType: 'normal' });
      expect(profile.teacher.teacherProfile.profileImage).toBeNull();
    });

    it('프로필 이미지 업데이트', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'name')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323')
        .field('yoga', 'IYENGAR')
        .attach('TEACHER_PROFILE', './tests/public/logo.png');
      expect(res.statusCode).toEqual(201);

      const profile = await findTeacherProfile({ uniqueKey: 'asd@naver.com', loginType: 'normal' });
      expect(profile.teacher.teacherProfile.profileImage).not.toBeNull();
    });

    it('기본정보 업데이트', async () => {
      const res = await agent
        .put('/profile/teacher')
        .field('name', 'fff')
        .field('introduce', 'introduce')
        .field('instagram', '0123232323')
        .field('yoga', 'IYENGAR');
      expect(res.statusCode).toEqual(201);

      const profile = await findTeacherProfile({ uniqueKey: 'asd@naver.com', loginType: 'normal' });
      expect(profile.teacher.teacherProfile.name).toEqual('fff');
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
});
