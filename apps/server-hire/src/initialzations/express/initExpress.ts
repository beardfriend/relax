import express from 'express';
import useBodyParser from '@SH/Initializations/express/lib/useBodyParser';
import setRoute from '@SH/Initializations/express/lib/setRoute';
import cookieParser from 'cookie-parser';

const initExpress = () => {
  const app = express();
  app.use(cookieParser('signup'));
  useBodyParser(app);
  setRoute(app);
  const port = process.env.EXPRESS_PORT;
  app.set('port', port);
  app.listen(port, () => console.log(`Listening ${port}`));
};

export default initExpress;
