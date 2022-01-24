import 'reflect-metadata';
import { createConnection } from 'typeorm';
import connectionOptions from '../../../ormconfig';

const initPostgres = () => {
  // const {
  //   TYPEORM_HOST,
  //   TYPEORM_PORT,
  //   TYPEORM_USERNAME,
  //   TYPEORM_PASSWORD,
  //   TYPEORM_DATABASE,
  //   TYPEORM_SYNCHRONIZE,
  //   TYPEORM_LOGGING,
  //   TYPEORM_ENTITIES,
  // } = process.env;

  createConnection(connectionOptions)
    .then(() => {
      console.log('connected postgres');
    })
    .catch((error) => console.log(`Postgres:${error}`));
};

export default initPostgres;
