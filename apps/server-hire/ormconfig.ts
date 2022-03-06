import env from '@SH/env';
import useDotenv from '@SH/Initializations/express/lib/useDotenv';
import { ConnectionOptions } from 'typeorm';

useDotenv();

export default {
  type: 'postgres',
  host: env.typeorm.host,
  port: env.typeorm.port,
  username: env.typeorm.username,
  password: env.typeorm.password,
  database: env.typeorm.database,
  synchronize: env.typeorm.sync,
  logging: env.typeorm.logging,
  entities: [env.typeorm.entities],
  migrations: [env.typeorm.migration],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
