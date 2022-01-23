import express from 'express';

const init = () => {
  const app = express();
  const port = 4000;
  app.set('port', port);
  app.listen(port, () => console.log('running'));
};
init();
