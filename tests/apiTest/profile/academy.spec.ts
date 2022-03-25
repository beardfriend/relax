import initExpress from '@SH/Initializations/express/initExpress';
import env from '@SH/env';
import request from 'supertest';
import { createConnection, getManager } from 'typeorm';
import { findAcademyProfile } from '@SH/Services/profile/academy';

describe('학원 프로필', () => {
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
  describe('PUT /profile/academy', () => {
    it('전체 프로필 등록', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'academyName')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('yoga', 'HATA')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo')
        .attach('ACADEMY_LOGO', './tests/public/logo.png')
        .attach('ACADEMY_INTRODUCE', './tests/public/introduceimage1.jpg')
        .attach('ACADEMY_INTRODUCE', './tests/public/introduceimage2.jpg');
      expect(res.statusCode).toEqual(201);
    });

    it('프로필 등록 체크', async () => {
      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      console.log(profile);
    });

    it('프로필 업데이트 요가리스트 Delete All', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'academyName')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo');
      expect(res.statusCode).toEqual(201);
      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      expect(profile.academy.academyProfile.yoga.length).toBe(0);
    });

    it('프로필 업데이트 요가 1개 Update', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'academyName')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo');
      expect(res.statusCode).toEqual(201);
      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      expect(profile.academy.academyProfile.yoga.length).toBe(1);
    });

    it('로고 이미지 지우기', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'academyName')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo')
        .field('isDeleteLogo', 'true');
      expect(res.statusCode).toEqual(201);

      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      expect(profile.academy.academyProfile.logo).toBeNull();
    });

    it('로고 이미지 업데이트', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'academyName')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo')
        .attach('ACADEMY_LOGO', './tests/public/logo.png');
      expect(res.statusCode).toEqual(201);

      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      expect(profile.academy.academyProfile.logo).not.toBeNull();
    });

    it('기본정보 업데이트', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'fff')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'region1Depth')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo');
      expect(res.statusCode).toEqual(201);

      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      console.log(profile.academy.academyProfile);
      expect(profile.academy.academyProfile.academyName).toEqual('fff');
    });

    it('주소 업데이트', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'fff')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'easd')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo');
      expect(res.statusCode).toEqual(201);

      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      expect(profile.academy.academyProfile.address.region1Depth).toEqual('easd');
    });

    it('소개 이미지 업데이트', async () => {
      const res = await agent
        .put('/profile/academy')
        .field('academyName', 'fff')
        .field('introduce', 'introduce')
        .field('representationNumber', '0123232323')
        .field('yoga', 'IYENGAR')
        .field('region1Depth', 'easd')
        .field('region2Depth', 'region2Depth')
        .field('region3Depth', 'region3Depth')
        .field('roadName', 'roadName')
        .field('mainBuildingNo', 'mainBuildingNo')
        .field('subBuildingNo', 'subBuildingNo')
        .attach('ACADEMY_INTRODUCE', './tests/public/introduceimage1.jpg');
      expect(res.statusCode).toEqual(201);

      const profile = await findAcademyProfile('asd@naver.com', 'normal');
      console.log(profile.academy.academyProfile.introduceImage);
    });

    describe('GET /profile/academy', () => {
      it('프로필 조회', async () => {
        const res = await agent.get('/profile/academy');
        console.log(res);
        expect(res.statusCode).toEqual(200);
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
});
