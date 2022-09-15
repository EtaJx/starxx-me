import { fetchFileContent } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req;
  const content: any = await fetchFileContent(id as string);
  res.statusCode = 200;
  res.json({
    ...content
  });
};
