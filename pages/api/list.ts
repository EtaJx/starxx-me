// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
import { initGooleDriverAuthor } from '@/lib/utils';

export default async (req: any, res: any) => {
  const hasAList = await initGooleDriverAuthor();
  console.log('hasAList', hasAList);
  fs.readFile('./data.json', (err, context) => {
    if (err) {
      res.statusCode = 404;
      res.json({
        result: 'there is no list'
      });
    }
    res.statusCode = 200;
    res.json({
      result: JSON.parse(context.toString())
    });
  });
};
