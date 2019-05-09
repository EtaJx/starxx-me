const { getOTP } = require('../../lib/md5');
const filter = (option) => {
  return async (ctx, next) => {
    getOTP();
    await next();
  }
}


module.exports = filter