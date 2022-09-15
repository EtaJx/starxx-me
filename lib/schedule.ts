import schedule from 'node-schedule';
import { initGoogleDriverAuthor } from './utils';

const rule = new schedule.RecurrenceRule();
rule.second = 0;
rule.minute = 0;
rule.hour = [0, 6, 12, 18];

export const startSchedule = () => {
  schedule.scheduleJob(rule, async () => {
    console.log('start update schedule');
    await initGoogleDriverAuthor();
  });
};
