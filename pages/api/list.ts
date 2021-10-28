// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
import { initGooleDriverAuthor } from '@/lib/utils';

export default (req: any, res: any) => {
  fs.readFile('./data.json', async (err, context) => {
    if (err) {
      const content = await initGooleDriverAuthor();
      res.statusCode = 200;
      res.json({
        result: JSON.parse(content.toString())
      });
    }
    if (context) {
      res.statusCode = 200;
      res.json({
        result: JSON.parse(context.toString())
      });
    } else {
      res.statusCode = 500;
      res.json({
        status: 'waiting'
      });
    }
  });
};
