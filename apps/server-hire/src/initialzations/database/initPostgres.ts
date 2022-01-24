import 'reflect-metadata';
import { createConnection } from 'typeorm';
import connectionOptions from '../../../ormconfig';

const initPostgres = () => {
  createConnection(connectionOptions)
    .then(() => {
      console.log('connected postgres');
    })
    .catch((error) => console.log(`Postgres:${error}`));
};

export default initPostgres;
