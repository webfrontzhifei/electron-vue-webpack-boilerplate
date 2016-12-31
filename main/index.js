'use strict';

const helper = require('electron-window-helper')
const {app, Menu} = require('electron')
const {NODE_ENV} = process.env
const baseDir = require('path').join(__dirname, '..')

// crashReporter.start();

let url = `file://${baseDir}/build/app.html`
if (NODE_ENV === 'development') {
  url = 'http://localhost:3000/build/app.html'
  require('electron-debug')()
}

app.on('ready', () => {
  let mainWin = helper.open('main', url, {
    width: 1024,
    height: 768,
    show: true
  })

  if (NODE_ENV === 'development') {
    mainWin.openDevTools()
  }
})
