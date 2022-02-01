import Express from 'express';
import User from '@SH/Routers/user';

const setRoute = (app: Express.Application) => {
  app.use('/user', User);
};

export default setRoute;
