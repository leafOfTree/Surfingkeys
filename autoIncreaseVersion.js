/**
 * Auto increase [a.b.version] in json configfile
 */

const { execSync } = require('child_process');
const fs = require('fs');
const prettier = require('prettier');

let path = ['./package.json', './manifest.json'];
autoIncreaseVersion(path);

function autoIncreaseVersion(configPath) {
  if (!configPath.length) {
    configPath = [configPath];
  }
  configPath.forEach((path) => {
    autoIncrease(path);
  })
}

function autoIncrease(path) {
  const config = require(path);
  const versions = config.version.split('.');
  const length = versions.length;
  versions[length-1] = parseInt(versions[length-1]) + 1
  config.version = versions.join('.');
  console.log('New version: ', config.version);

  fs.writeFileSync(path, prettier.format(JSON.stringify(config), {
    parser: 'json'
  }));
}
