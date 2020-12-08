import Koa from 'koa';
import errorHandler from './middleware/error';

const app = new Koa();

app.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 3200;

const server = app.listen(port);

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});
