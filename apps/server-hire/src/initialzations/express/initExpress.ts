import express from 'express';
import useBodyParser from '@SH/Initializations/express/lib/useBodyParser';

const initExpress = () => {
  const app = express();
  useBodyParser(app);

  const port = process.env.EXPRESS_PORT;
  app.set('port', port);
  app.listen(port, () => console.log(`Listening ${port}`));
};

export default initExpress;
