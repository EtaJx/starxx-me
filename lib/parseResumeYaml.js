const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const root = path.join(__dirname, '..');

const info = () => {
  try {
    const data = yaml.load(fs.readFileSync(`${root}/yaml/resume.yaml`), 'utf8');
    // const fileName = path.basename(`${root}/yaml/resume.yaml`);
    return data;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = info;
