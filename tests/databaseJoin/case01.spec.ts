import { getManager, getRepository } from 'typeorm';
import beforeInit from '../beforeInit';
import Resume from '@Libs/entites/test/databaseJoin/caseA01';
import Yoga from '@Libs/entites/test/databaseJoin/caseA02';
import Profile from '@Libs/entites/test/databaseJoin/caseA03';

import { yogaSortType } from '@Libs/constants/types/yogaSort';

// 데이터베이스 형식에 따른, caseA vs caseB 속도 테스트
describe('DB서버 & Express 서버실행 typeOrm Setting', () => {
  beforeAll(async () => {
    await beforeInit();
    for (let i = 0; i < 100; i += 1) {
      const manager = getManager();
      //CASE A

      const yoga = new Yoga();
      yoga.yoga_name = i % 2 === 1 ? yogaSortType.ACRO : yogaSortType.ADIDAS;
      await manager.save(yoga);

      const yoga2 = new Yoga();
      yoga2.yoga_name = i % 2 === 1 ? yogaSortType.FLYING : yogaSortType.INSIDE_FLOW;
      await manager.save(yoga2);

      const resume = new Resume();
      resume.a = `1${i}`;
      resume.b = `2${i}`;

      const profile = new Profile();
      profile.a = `1${i}`;
      profile.b = `2${i}`;

      resume.yoga = [yoga, yoga2];
      profile.yoga = [yoga, yoga2];
      await manager.save(resume);
      // CASE B
    }
  });

  describe('ㅇㅇ', () => {
    test('Join을 했을 때 결과', async () => {
      const resume = await getRepository(Resume)
        .createQueryBuilder('resume')
        .leftJoinAndSelect('resume.yoga', 'yoga')
        .getMany();
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
