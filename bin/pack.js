/* eslint strict: 0, no-shadow: 0, no-unused-vars: 0, no-console: 0 */
'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs.extra');
const webpack = require('webpack');
const packager = require('electron-packager');
const builder = require('electron-builder');
const del = require('del');
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('../package.json');
const devDeps = Object.keys(pkg.devDependencies);
const env = process.env.NODE_ENV || 'production';

const appName = argv.name || argv.n || pkg.productName;
const shouldUseAsar = argv.asar || argv.a || false;
const shouldBuildAll = argv.all || false;
const version = argv.version || argv.v;

const basePath = path.join(__dirname, '..');
const packDirName = env === 'testing' ? env : 'release';
const packDir = path.join(basePath, packDirName, pkg.version);
const appPath = packDir;

const webpackCfgPath = `../webpack-config/${env}.js`;
const webpackCfg = require(webpackCfgPath);


const DEFAULT_OPTS = {
  dir: basePath,
  name: appName,
  version: version || '0.36.2',
  "app-version": pkg.version,
  asar: shouldUseAsar,
  ignore: [
    '/bin($|/)',
    '/test($|/)',
    '/tools($|/)',
    '/testing($|/)',
    '/release($|/)',
    '/src($|/)',
    '/webpack-config($|/)',
    '/bin($|/)',
    '/resources($|/)',
    '/devtools($|/)',
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

const BUILDER_CFG = {
  appPath: packDir,
  basePath: basePath,
  out: path.join(packDir, 'installer'),
  platform: '',
  config: {
    osx: {
      "title": pkg.name,
      "icon": "resources/osx/icon.icns",
      "icon-size": 80,
      "background": "resources/osx/dmg-background.png",
      "contents": [{
        "x": 410,
        "y": 220,
        "type": "link",
        "path": "/Applications"
      }, {
        "x": 130,
        "y": 220,
        "type": "file",
        "path": `${pkg.name}.app`
      }]
    },
    win: {
      title: pkg.name,
      icon: 'resources/windows/icon.ico'
    },
    win32: {
      title: pkg.name,
      icon: 'resources/windows/icon.ico'
    },
    linux: {}
  }
};

function webpackBuild() {
  console.log('webpackBuild');
  return new Promise((resolve, reject) => webpack(webpackCfg, (err, stats) => {
    return err ? reject(new Error('webpack error:', err)) : resolve(stats);
  }));
}

function checkElectronVersion() {
  return new Promise((resolve, reject) => {
    exec('npm list electron-prebuilt', (err, stdout) => {
      if (!err) {
        DEFAULT_OPTS.version = stdout.split('electron-prebuilt@')[1].replace(/\s/g, '');
      }

      resolve();
    });
  });
}

function beforePack() {
  return new Promise((resolve, reject) => {
    fs.copy(`${basePath}/config/${env}.js`, `${basePath}/config/index.js`, {
      replace: true
    }, (err) => {
      return err ? reject(new Error('replace env failed:', err)) : resolve();
    });
  });
}


function startPack() {
  return webpackBuild().then((stats) => del(packDirName)).then((paths) => {
    console.log('start pack');
    if (!shouldBuildAll) {
      // build for current platform only
      return pack(os.platform(), os.arch());
    }

    // build for all platforms
    return Promise.all(['linux', 'win32', 'darwin'].map((plat) => {
      return Promise.all(['ia32', 'x64'].map((arch) => pack(plat, arch)))
    }));
  });
}

function afterPack() {
  console.log('after pack, replace env...');
  fs.copy(
    `${__dirname}/../config/development.js`,
    `${__dirname}/../config/index.js`, {
      replace: true
    }, (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

function build(plat, arch, target) {
  let appPath = path.join(
    packDir,
    `${pkg.name}-${plat}-${arch}`
  );

  return new Promise((resolve, reject) => {
    if (plat === 'darwin') {
      if (arch === 'ia32') {
        return resolve();
      }

      builder.init().build(Object.assign({}, BUILDER_CFG, {
        appPath: path.join(appPath, `${pkg.name}.app`),
        platform: 'osx',
      }), (err) => {
        return err ? reject(err) : resolve();
      });
    }
    if (plat === 'win32') {
      builder.init().build(Object.assign({}, BUILDER_CFG, {
        appPath: appPath,
        platform: arch === 'ia32' ? 'win32' : 'win',
        outFile: path.join(BUILDER_CFG.out, `${pkg.name}-${plat}-${arch}.exe`)
      }), (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    }
  });
}

function pack(plat, arch) {
  return new Promise((resolve, reject) => {
    // there is no darwin ia32 electron
    if (plat === 'darwin' && arch === 'ia32') {
      return resolve();
    }
    ;

    let icon;
    if (plat === 'darwin') {
      icon = 'resources/osx/icon.icns';
    } else if (plat === 'win32') {
      icon = 'resources/windows/icon.ico'
    } else if (plat === 'linux') {
      icon = 'resources/linux/icon.png';
    }

    let opts = Object.assign({}, DEFAULT_OPTS, {
      platform: plat,
      arch: arch,
      icon: icon,
      prune: true,
      out: `${packDirName}/${pkg.version}`
    });

    packager(opts, (err, filepath) => {
      return err ? reject(err) : resolve(filepath);
    });
  }).then(() => build(plat, arch));
}

checkElectronVersion().then(beforePack).then(startPack).then(afterPack).catch(console.trace);
