/* eslint-disable no-self-compare */
// no import here as this runs without babel
const fs = require('fs-extra');
const path = require('path');


const hiddenFile = /(^(\.|\/\.))|(.md$)/g;
function getFilesFor(dir) {
  return fs
    .readdirSync(path.join(__dirname, '/' + dir))
    .filter(file => !hiddenFile.test(file))
    .map(function(file) {
      let superBlock;
      if (fs.statSync(path.join(__dirname, dir + '/' + file)).isFile()) {
        return { file: file };
      }
      superBlock = file;
      return getFilesFor(dir + '/' + superBlock).map(function(data) {
        return {
          file: superBlock + '/' + data.file,
          superBlock: superBlock
        };
      });
    })
    .reduce(function(files, file) {
      if (!Array.isArray(file)) {
        files.push(file);
        return files;
      }
      return files.concat(file);
    }, []);
}

function getSupOrder(filePath) {
  const order = parseInt((filePath || '').split('-')[0], 10);
  // check for NaN
  if (order !== order) {
    return 0;
  }
  return order;
}

function getSupName(filePath) {
  const order = parseInt((filePath || '').split('-')[0], 10);
  // check for NaN
  if (order !== order) {
    return filePath;
  }

  return (filePath || '')
    .split('-')
    .splice(1)
    .join('-');
}

module.exports = function getChallenges() {
  return getFilesFor('challenges').map(function(data) {
    const challengeSpec = require('./challenges/' + data.file);
    challengeSpec.fileName = data.file;
    challengeSpec.superBlock = getSupName(data.superBlock);
    challengeSpec.superOrder = getSupOrder(data.superBlock);

    return challengeSpec;
  });
};
