import { fetchFileContent } from '@/lib/utils';

export default async (req: any, res: any) => {
  const { query: { id } } = req;
  const content: any = await fetchFileContent(id);
  res.statusCode = 200;
  res.json({
    ...content
  });
};
