import { MigrationInterface, getConnection, QueryRunner } from 'typeorm';
import casual from 'casual';
import User from '@SH/Entities/user/user';

class Seed1643011552762 implements MigrationInterface {
  public async up(): Promise<void> {
    const value: {}[] = [];
    for (let i = 0; i < 100; i += 1) {
      const test = {
        email: casual.email,
        password: casual.password,
        phone_number: casual.phone,
      };
      value.push(test);
    }
    if (value.length === 0) {
      return;
    }
    await getConnection().createQueryBuilder().insert().into(User).values(value).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`truncate table public.user cascade;`);
  }
}

export default Seed1643011552762;
