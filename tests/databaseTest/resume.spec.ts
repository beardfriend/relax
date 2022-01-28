import { getManager, getRepository, getConnection } from 'typeorm';
import beforeInit from '../beforeInit';
import Resume from '@SH/Entities/resume/resume';
import Certification from '@SH/Entities/resume/certification';
import User from '@SH/Entities/user/user';
import ClassContent from '@SH/Entities/resume/classContent';
import WorkExperience from '@SH/Entities/resume/workExperience';
import { yogaSortType } from '@Libs/constants/types';

// 데이터베이스 형식에 따른, caseA vs caseB 속도 테스트
describe('DB서버 & Express 서버실행 typeOrm Setting', () => {
  beforeAll(async () => {
    await beforeInit();
    const manager = getManager();
    const user = new User();
    user.email = 'asd@naver.com';
    user.password = 'password';
    await manager.save(user);
  });

  describe('데이터베이스 Resume 동작 테스트', () => {
    test('Resume Write', async () => {
      const manager = getManager();

      const classContent = new ClassContent();
      classContent.yogaType = [yogaSortType.ACRO, yogaSortType.ADIDAS];
      classContent.running_time = 3;
      await manager.save(classContent);

      const workExperience = new WorkExperience();
      workExperience.academy_name = '하타요가';
      workExperience.work_start = '2020-09-20';
      workExperience.work_end = '2020-09-21';
      workExperience.etc_explain = 'explain';
      workExperience.class_content = [classContent];
      await manager.save(workExperience);

      const certification = new Certification();
      certification.agency_name = '에이전시';
      certification.class_start = '2021-09-21';
      certification.class_end = '2021-09-22';
      certification.yogaType = [yogaSortType.HATA];
      certification.etc_explain = 'explain';
      await manager.save(certification);

      const resume = new Resume();
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email: 'asd@naver.com' } });
      if (user === undefined) {
        return;
      }
      resume.resume_name = '1번 이력서';
      resume.certification = [certification];
      resume.work_experience = [workExperience];
      await manager.save(resume);
      await getConnection().createQueryBuilder().insert().into(User);
      user.resume = [resume];
      await userRepo.save(user);
    });

    test('Resume Read 01', async () => {
      const userRepo = getRepository(User);

      const result = await userRepo.find({
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            resume: 'user.resume',
          },
        },
        where: {
          email: 'asd@naver.com',
        },
      });
      console.log(result);
    });

    test('Resume Read02', async () => {
      const userRepo = getRepository(User);
      const resumeRepo = getRepository(Resume);
      const workExperienceRepo = getRepository(WorkExperience);
      const user = await userRepo.findOne({ where: { email: 'asd@naver.com' } });
      const resume = await resumeRepo.find({
        where: { user: user?.id },
      });
      const workExperience = await workExperienceRepo.find({ where: { resume: resume[0].id } });
      console.log(workExperience);
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
