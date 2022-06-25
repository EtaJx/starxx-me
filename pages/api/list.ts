// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
import { initGooleDriverAuthor } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
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
