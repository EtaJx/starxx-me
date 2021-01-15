const withLess = require('@zeit/next-less');
const path = require('path');
module.exports = withLess({
  cssLoaderOptions: {
    importLoaders: 1,
    localIndentName: '[local]__[hash:base64:5]'
  },
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  rewrites: () => {
    return [{
      source: '/',
      destination: '/index'
    }];
  }
});
