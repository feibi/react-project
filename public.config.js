const { resolve, join } = require('path');

const dllDirName = 'public-dlls';
const buildName = 'build';
const distName = 'dist';
const dllName = 'vendor';

module.exports = {
  names: {
    dllDirName,
    dllName,
    buildName,
    distName
  },
  paths: {}
};
