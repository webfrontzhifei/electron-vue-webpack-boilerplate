
# An Electron + Vue.js Boliplate

## Development

1. git clone https://github.com/gaoqiankun/electron-vue-webpack-boilerplate.git && cd electron-vue-webpack-boilerplate && npm i 
2. shell 1   npm run dev-server
3. shell 2   npm run dev

## Application Structure

    ├── bin                scripts
    │   ├── pack.js        
    │   ├── server.js      hot module replacement server
    ├── src                source code directory
    │   ├── components     write vue components here
    │   ├── services       write services here
    │   ├── app.html       html template file
    │   ├── app.js         entry js file
    │   └── 
    ├── main               main process entry module
    ├── config             config directory
    ├── resources          resources 
    ├── production         production client will be placed here 
    ├── testing            testing client will be placed here 
    └── test               unit tests directory

## Run Scripts

* npm build                build production bundle
* npm run release          pack release client for current system
* npm build-testing        build testing bundle
* npm run pack-testing     pack testing client for current system
* npm run lint             eslint
* npm run test             unit tests
* npm run test-watch       unit tests in watch mode
* npm run dev              start dev client
* npm run dev-server       start hot module replacement server

## Other Specifications

* *node v6 LTS are *recommended*
* *npm v3 are *recommended*
* use --save only for main process dependences 
* *wine* is required when pack client for windows system in linux/osx
* Only use one of ES5 and ES6 syntax, *ES2015* is *recommended*
* vue componenet use .vue extension,  style first, template then, script last
* vue indent with 2 space，*editorconfig* is recomended，there is already a config at root directory
