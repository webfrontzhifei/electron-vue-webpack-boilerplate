'use strict'

const basePath = require('path').join(__dirname, '..')
const pkg = require(`${basePath}/package.json`)
const webpack = require('webpack')
const builder = require('electron-builder')
const env = process.env.NODE_ENV || 'production'
const shell = require('shelljs')

function prepeare () {
  return Promise.resolve().then(() => {
    shell.echo('FIRST STEP: ', 'prepare for packing...')
    let config = JSON.stringify(require(`${basePath}/config/${env}`), null, 2)
    shell.ShellString(config).to(`${basePath}/config/index.json`)
  })
}

function webpackBuild () {
  shell.echo('SECOND STEP: ', 'webpack building...')

  let cfg = require(`${basePath}/webpack-config/${env}`)
  return new Promise((resolve, reject) => webpack(cfg, (err, stats) => {
    return err ? reject(new Error('webpack error: ', err)) : resolve(stats)
  }))
}

function build () {
  shell.echo('THIRD STEP: ', 'app building...')
  let {WINDOWS, MAC, LINUX} = builder.Platform
  let current = builder.Platform.current()
  let targets = env === 'production' ? [WINDOWS, MAC, LINUX] : [current]
  let options = {
    targets: builder.createTargets(targets, null, 'all'),
    version: pkg.version,
    devMetadata: {
      build: {
        appId: 'com.electron-vue-bolierplate',
        productName: pkg.name,
        asar: true,
        compression: 'normal',
        mac: {
          icon: 'resources/osx/icon.icns',
          target: 'default',
          category: 'public.app-category.developer-tools'
        },
        dmg: {
          title: pkg.name,
          icon: 'resources/osx/dmg-icon.icns',
          background: 'resources/osx/dmg-background.png'
        },
        win: {
          icon: 'resources/windows/icon.ico',
          iconUrl: 'http://git.eformax.com/fx/fx-client/blob/master/resources/windows/icon.ico',
          target: 'squirrel',
          loadingGif: 'resources/windows/install-spinner.gif'
        },
        linux: {
        },
        files: [
          'main',
          'build',
          'node_modules',
          'config/index.json'
        ]
      },
      directories: {
        buildResources: 'build-resource',
        output: `${env}/${pkg.version}`
      }
    }
  }

  return builder.build(options).then(() => {
    shell.echo('Building successed.')
  }).catch((err) => {
    shell.echo('Building error: ', err)
    throw err
  })
}

function recovery () {
  shell.echo('FOURTH STEP: ', 'recovery to development...')
}

prepeare().then(webpackBuild).then(build).then(recovery).catch(console.trace)

