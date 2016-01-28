
# An Electron + Vue.js Boliplate

## Development

1. git clone https://github.com/gaoqiankun/electron-vue-webpack-boilerplate.git && cd evernote && npm i 
2. shell 1   npm run dev-server
3. shell 2   npm run dev

## Application Structure

    ├── bin                scripts
    │   ├── pack.js        
    │   ├── server.js      hot module replacement server
    ├── src                source code directory
    │   ├── components     write vue components here
    │   ├── services       write services here
    │   ├── vendor         define library here
    │   ├── app.html       html template file
    │   ├── app.js         entry js file
    │   └── 
    ├── release            release client will be placed here 
    ├── testing            testing client will be placed here 
    ├── config             config directory
    ├── node_modules       node modules are placed here
    ├── resources          resources 
    ├── main.js            main entry file   
    └── test               unit tests directory(will use mocha)

## Run Scripts

* npm run dev-server       start hot module replacement server
* npm run dev              start dev client
* npm build                build production bundle
* npm run pack-testing     pack testing client for current system
* npm run pack-testing-all pack testing client for linux、oxs and windows system
* npm run release          pack release client for current system
* npm run release-all      pack release client for linux、oxs and windows system
* npm run lint             eslint
* npm run test             unit tests
* npm run test-watch       unit tests in watch mode

## Other Specifications

* *node v4.xx.xx* LTS are *recommended* 
* *npm v2.xx.xx* are *recommended*
* use --save only for main process dependences 
* *wine* is required when pack client for windows system in linux/osx
* Only use one of ES5 and ES6 syntax, *ES2015* is *recommended*
* vue componenet use .vue extension,  style first, template then, script last
* vue indent with 2 space，*editorconfig* is recomended，there is already a config at root directory
