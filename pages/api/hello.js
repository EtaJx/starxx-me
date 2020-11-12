// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initGooleDriverAuthor } from '@/lib/utils';

export default (req, res) => {
  initGooleDriverAuthor();
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
