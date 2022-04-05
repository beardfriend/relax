import Express from 'express';
import Auth from '@SH/Routers/auth';
import Role from '@SH/Routers/role';
import Profile from '@SH/Routers/profile';
import User from '@SH/Routers/user';
import Tags from '@SH/Routers/tags';

const setRoute = (app: Express.Application) => {
  app.use('/auth', Auth);
  app.use('/role', Role);
  app.use('/profile', Profile);
  app.use('/user', User);
  app.use('/tags', Tags);
};

export default setRoute;
