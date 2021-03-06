import 'reflect-metadata';
import 'es6-shim';
import env from '@SH/env';
import useDotenv from '@SH/Initializations/express/lib/useDotenv';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Entites from '@SH/Entities/index';

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
  entities: Entites,
  migrations: [env.typeorm.migration],
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
} as ConnectionOptions;
