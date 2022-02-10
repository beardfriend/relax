import { getManager } from 'typeorm';
import beforeInit from '../beforeInit';
import Test_b_Teacher from '@Libs/entites/test/explain/01/b/teacher';
import Test_b_Yoga from '@Libs/entites/test/explain/01/b/yoga';
import Test_b_Academy from '@Libs/entites/test/explain/01/b/academy';
import Test_a_Teacher from '@Libs/entites/test/explain/01/a/teacher';
import Test_a_Academy from '@Libs/entites/test/explain/01/a/academy';
import casual from 'casual';
import { yogaSortType } from '@Libs/constants/types';

function yogaTypeSwitch(key: string) {
  switch (key) {
    case 'ACRO':
      return yogaSortType.ACRO;
    case 'ADIDAS':
      return yogaSortType.ADIDAS;
    case 'ASHTANGA':
      return yogaSortType.ASHTANGA;
    case 'FLYING':
      return yogaSortType.FLYING;
    case 'HATA':
      return yogaSortType.HATA;
    case 'HEALING':
      return yogaSortType.HEALING;
    default:
      throw new Error('error');
  }
}

/*
    @결과
      요가종류를 관계형으로 빼기 vs 배열로 각 테이블에 배치
    프로필 목록 가져오기
      ✓ CASE A (28 ms)
      ✓ CASE B (5 ms)
      ✓ CASE B 1000개 테스트 no join (4 ms)
      ✓ CASE B 1000개 테스트 join (4 ms)
    선생님과 학원 요가 종류 같은 것 뽑아내기
      ✓ CASE A (31 ms)
      ✓ CASE B (18 ms)
*/

describe('요가종류를 관계형으로 빼기 vs 배열로 각 테이블에 배치', () => {
  beforeAll(async () => {
    await beforeInit();
    const manager = getManager();
    const yogaArray = ['ACRO', 'ADIDAS', 'ASHTANGA', 'FLYING', 'HATA', 'HEALING'];
    for (let i = 0; i < 10000; i += 1) {
      const number = Math.floor(Math.random() * 5);
      const number2 = Math.floor(Math.random() * 5);

      const yogaType = yogaTypeSwitch(yogaArray[number]);
      const yoga = manager.create(Test_b_Yoga, { name: yogaType });
      await manager.save(yoga);
      const teacher = manager.create(Test_b_Teacher, { title: casual.state, yoga: [yoga] });
      await manager.save(teacher);

      const yogaType2 = yogaTypeSwitch(yogaArray[number2]);
      const yoga2 = manager.create(Test_b_Yoga, { name: yogaType2 });
      await manager.save(yoga2);
      const academy = manager.create(Test_b_Academy, { title: casual.state, yoga: [yoga2] });
      await manager.save(academy);

      const yogaA = manager.create(Test_a_Academy, {
        title: casual.state,
        yoga: [yogaType],
      });
      await manager.save(yogaA);
      const teacherA = manager.create(Test_a_Teacher, {
        title: casual.state,
        yoga: [yogaType],
      });

      await manager.save(teacherA);

      const academyA = manager.create(Test_a_Academy, {
        title: casual.state,
        yoga: [yogaType],
      });

      await manager.save(academyA);
    }
  });
  describe('프로필 목록 가져오기', () => {
    it('CASE A', async () => {
      const manager = getManager();
      const idSearch = await manager.query(` SELECT id FROM test_a_academy where title = 'asd@naver.com'`);
      console.log(idSearch);
      const result = await manager.query(` SELECT yoga FROM test_a_academy where id = 1`);
      console.log(result);
    });
    it('CASE B', async () => {
      const manager = getManager();
      const result = await manager.query(` SELECT name FROM test_b_yoga WHERE "teacherId" = 1`);
      return console.log(result);
    });

    test('CASE B 1000개 테스트 no join', async () => {
      const manager = getManager();
      const idSearch = await manager.query(`SELECT id FROM test_b_teacher where id = 49`);
      console.log(idSearch[0].id);
      const result = await manager.query(` SELECT name FROM test_b_yoga where id = ${idSearch[0].id}`);
      console.log(result);
    });

    test('CASE B 1000개 테스트 join', async () => {
      const manager = getManager();
      const result = await manager.query(
        ` SELECT b.name FROM test_b_teacher AS a INNER JOIN test_b_yoga AS b ON a.id = b.id WHERE b."teacherId" = 49`
      );
      console.log(result);
    });
  });

  describe('선생님과 학원 요가 종류 같은 것 뽑아내기', () => {
    test('CASE A', async () => {
      const manager = getManager();
      const result = await manager.query(` SELECT id FROM test_a_teacher where '아크로' = ANY(yoga)`);
      const result2 = await manager.query(` SELECT id FROM test_a_academy where '아크로' = ANY(yoga)`);
      console.log(result, result2);
    });

    test('CASE B', async () => {
      const manager = getManager();
      const result = await manager.query(
        ` 
        SELECT A.id FROM 
        test_b_teacher AS A 
        INNER JOIN 
        test_b_yoga AS B 
        ON A.id = B.id 
        WHERE B.name = '아크로'
        `
      );
      const result2 = await manager.query(
        ` 
        SELECT A.id FROM 
        test_b_teacher AS A 
        INNER JOIN 
        test_b_yoga AS B 
        ON A.id = B.id 
        WHERE B.name = '아크로'
        `
      );

      console.log(result, result2);
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
