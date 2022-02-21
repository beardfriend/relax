import Express from 'express';
import User from '@SH/Routers/user';
import Profile from '@SH/Routers/profile';

const setRoute = (app: Express.Application) => {
  app.use('/user', User);
  app.use('/profile', Profile);
};

export default setRoute;
