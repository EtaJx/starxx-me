const fs = require('fs');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getHex = () => {
  let n = 0;
  for (let i = 4; i > 0; i--) {
    n = (getRandomInt(0, 1) << (i - 1)) + n;
  }
  return n.toString(16);
};

const getOTP = () => {
  const arr = [];
  for (let i = 0; i < 32; i++) {
    arr.push(getHex());
  }
  if(arr.length != 0) {
    fs.writeFileSync(`${process.cwd()}/key`, `${arr.join('')} -- ${new Date().toLocaleString().replace(/\\/g, '-')}\n`, 'utf8'); // 将每次生成的key存下来，用于解密
  }
  return arr.join('');
};

const handleXOR = (message, key) => {
  const result =  Array.from(message).map((item, index) => {
    const m = parseInt(item, 16)
    const k = parseInt(key.substr(index, 1), 16)
    return (m ^ k).toString(16);
  }).join('');
  return result;
}

module.exports = {
  handleXOR,
  getOTP
}
