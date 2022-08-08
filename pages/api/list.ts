// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFile } from 'fs/promises';
import { initGoogleDriverAuthor } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let content;
  try {
    const controller = new AbortController();
    const { signal } = controller;
    const fsPromise = await readFile('./data.json', { signal });
    controller.abort();
    content = await fsPromise;
  } catch (err) {
    console.log('fetching data...');
    content = await initGoogleDriverAuthor();
  }
  res.statusCode = 200;
  res.json({
    result: JSON.parse(content.toString())
  });
};
