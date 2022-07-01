import schedule from 'node-schedule';
import * as childProcess from 'child_process';
import { initGooleDriverAuthor } from './utils';
import * as path from 'path';

const CACHE = path.resolve(process.cwd(), './data.json');
const { exec } = childProcess;

const rule = new schedule.RecurrenceRule();
rule.second = 0;
rule.minute = [0, 30];

const clearCache = () => {
  return new Promise(resolve => {
    exec(`rm ${CACHE}`, err => {
      if (err) {
        console.log(`clear cache error: ${err}`);
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

export const startSchedule = () => {
  schedule.scheduleJob(rule, async () => {
    console.log('start update list');
    await clearCache();
    await initGooleDriverAuthor();
  });
};
