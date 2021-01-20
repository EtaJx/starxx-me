import * as fs from 'fs';
import yaml from 'js-yaml';

const root = process.cwd();

export default (req: any, res: any) => {
  try {
    const resumeBuffter = fs.readFileSync(`${root}/yaml/resume.yaml`, 'utf8');
    const data = yaml.load(resumeBuffter.toString());
    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err
    });
  }
};
