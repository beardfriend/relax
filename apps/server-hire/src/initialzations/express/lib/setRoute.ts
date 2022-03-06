import Express from 'express';
import Auth from '@SH/Routers/auth';
import Role from '@SH/Routers/role';
import Profile from '@SH/Routers/profile';

const setRoute = (app: Express.Application) => {
  app.use('/auth', Auth);
  app.use('/role', Role);
  app.use('/profile', Profile);
};

export default setRoute;
