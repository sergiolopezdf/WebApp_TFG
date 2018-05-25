# WebApp: a pilot test for a platform to distribute corporative multimedia content 

This platform contains servers for video, chat, forum and a client to manage all of these resources. It is based on a microservices architecture. Each server is a different service that runs individually. 

The easiest way of using the servers is through the main app (webApp).

## Credits

This app has been built upon this boilerplate:

https://github.com/sonsoleslp/react-iweb-boilerplate

However, it needed some tweaking. The transformation to the boilerplate turned into another boilerplate which can be found here:

https://github.com/sergiolopezdf/boilerplate-react-redux-express


## Prerequisites

  * Node.js 8.9.0
  * FFMPEG
  * Git

## Instructions
1. Clone the entire repository
2. Get into the directory: `cd WebApp_TFG`
3. Create an empty folder called db: `mkdir db`. This is where the SQLite database will be placed
3. Get into each server folder and run `npm install`. Wait until each installation finishes
4. Run `npm start` on each server folder. You will need to do this at least four times if you want to boot the entire app. Otherwise, the app will be working but it will not be able to access to those servers you have not started
5. After running `npm start` on the 'webApp', a browser window should open automatically. If it does not, you can access manually at `http://localhost:3000`

## Deployment configuration
An example on how to deploy this app can be bound here:

https://github.com/sergiolopezdf/webAppProduction

## Commands available on each server
 * `npm start`: it runs the server
 * `npm install`: it installs the required dependencies (package.json)

## Commands available only on webApp
 * `npm run production`: it generates a minified package of the webApp which is ready to run in production environments

Although they have not been tested on this project, the rest of the commands available are specified on the initial boilerplate repository. 

## Technologies on webApp

These are the tecnologies that have been supported on the project. The boilerplate may include a few more, but they have not been tested. 
- [x] React 16.0.0
- [x] ECMAScript 6 and JSX support
- [x] React Router v4
- [x] Latest Webpack (v.3.6.0) and Webpack Dev Server (v.2.8.2) with Scope Hoisting enabled
- [x] Hot Module Replacement using [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [x] ES6 linting with continuous linting on file change
- [x] SASS support
- [x] Production Config
- [x] Redux
- [x] Express

### Relevant middlewares that have been used to communicate with the rest of the servers

- [x] Socket IO Client
- [x] Sequelize (Postgres & SQLite)
- [x] Passport
- [x] Cripto JS

## Techonologies on forum server
- [x] Babel. ECMAScript 6
- [x] Express

## Techonologies on chat server
- [x] Socket IO

## Techonologies on video server

Video server based on HTTP Live Streaming (HLS)
- [x] HLS Server
- [x] Babel. ECMAScript 6
- [x] Express

