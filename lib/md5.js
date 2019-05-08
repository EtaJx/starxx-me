'use strict'
const md5 = (message, key) => {
  return Array.from(message).map(item => {
    let charCode = item.charCodeAt(); // 获取每个字符的ascii码
    charCode = charCode ^ key // 进行异或
    return String.fromCharCode(charCode) //获取异或之后ascii码对应的字符
  }).join('');
};

module.exports = {
  md5
}
