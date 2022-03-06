import express from 'express';
import useBodyParser from '@SH/Initializations/express/lib/useBodyParser';
import setRoute from '@SH/Initializations/express/lib/setRoute';
import cookieParser from 'cookie-parser';
import env from '@SH/env';
import cors from 'cors';

const initExpress = () => {
  const app = express();
  app.use(cookieParser());
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(cors({ credentials: true, origin: true }));
  useBodyParser(app);
  setRoute(app);
  const { port } = env;
  app.set('port', port);
  app.listen(port, () => console.log(`Listening ${port}`));
  return app;
};

export default initExpress;
