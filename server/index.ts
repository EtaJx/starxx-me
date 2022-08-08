import next from 'next';
import { createServer } from 'http';
import { startSchedule } from '../lib/schedule';
// eslint-disable-next-line node/no-deprecated-api
import { parse } from 'url';
import 'dotenv/config';

const { HOST_NAME, PORT } = process.env;
const dev = process.env.NODE_ENV !== 'production';
const hostname = HOST_NAME;
const port = Number(PORT);

const app = next({
  dev,
  hostname,
  port
});

console.log('dev', dev, process.env.NODE_ENV);
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      if (req.url != null) {
        const parseUrl = parse(req.url, true);
        await handle(req, res, parseUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, () => {
    startSchedule();
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
