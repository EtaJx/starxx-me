import schedule from 'node-schedule';
import { initGooleDriverAuthor } from './utils';

const rule = new schedule.RecurrenceRule();
rule.second = 0;
rule.minute = [0, 30];

export const startSchedule = () => {
  schedule.scheduleJob(rule, async () => {
    console.log('start update list');
    await initGooleDriverAuthor();
  });
};
