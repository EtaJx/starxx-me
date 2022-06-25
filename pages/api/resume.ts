import * as fs from 'fs';
import yaml from 'js-yaml';
import { NextApiRequest, NextApiResponse } from 'next';

const root = process.cwd();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resumeBuffer = fs.readFileSync(`${root}/yaml/resume.yaml`, 'utf8');
    const data = yaml.load(resumeBuffer.toString());
    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err
    });
  }
};
