import Express from 'express';
import bodyParser from 'body-parser';

const useBodyParser = (app: Express.Application) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export default useBodyParser;
