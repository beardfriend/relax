import useDotenv from '@SH/Initializations/express/lib/useDotenv';
import { ConnectionOptions } from 'typeorm';

useDotenv();

export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [`${process.env.TYPEORM_ENTITIES}`],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
