const { getOTP } = require('../../lib/encrypt');
const filter = option => {
  return async (ctx, next) => {
    getOTP();
    await next();
  }
};


module.exports = filter
