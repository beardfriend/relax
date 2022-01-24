import 'reflect-metadata';
import { createConnection } from 'typeorm';

const initPostgres = () => {
  const {
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE,
    TYPEORM_SYNCHRONIZE,
    TYPEORM_LOGGING,
    TYPEORM_ENTITIES,
  } = process.env;

  createConnection({
    type: 'postgres',
    host: TYPEORM_HOST,
    port: Number(TYPEORM_PORT),
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    synchronize: Boolean(TYPEORM_SYNCHRONIZE),
    logging: Boolean(TYPEORM_LOGGING),
    entities: [`${TYPEORM_ENTITIES}`],
  })
    .then(() => {
      console.log('connected postgres');
    })
    .catch((error) => console.log(`Postgres:${error}`));
};

export default initPostgres;
