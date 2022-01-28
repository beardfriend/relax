import { yogaSortType } from '@Libs/constants/types/yogaSort';
import ResumeTree from '@Libs/entites/test/databaseJoin/test';
import { getManager } from 'typeorm';
import beforeInit from '../beforeInit';

// 데이터베이스 형식에 따른, caseA vs caseB 속도 테스트
describe('DB서버 & Express 서버실행 typeOrm Setting', () => {
  beforeAll(async () => {
    await beforeInit();
  });

  describe('typeorm 테스트', () => {
    test('Postgres, column Array 지원 하는지.', async () => {
      const manager = getManager();
      const resume = new ResumeTree();
      resume.a = '1';
      resume.b = '2';
      resume.yogaType = [yogaSortType.ACRO, yogaSortType.ADIDAS];
      await manager.save(resume);
    });

    test('Array데이터 정상적으로 가져오는지', async () => {
      const manager = getManager();
      const result = await manager.findOne(ResumeTree, 1);
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
