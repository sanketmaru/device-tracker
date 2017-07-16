import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import locationCtrl from './server/controllers/location.controller';

const debug = require('debug')('express-mongoose-es6-rest-api:index');
const server   = require('http').Server(app);

// socket connection
var io = require('socket.io')(server);

io.on('connection', (socket) => {
   console.log('The user is connected', socket);

   socket.on('disconnect', function(){
     console.log('The user is disconnected');
   });

   socket.on('add-location', (message) => {
     console.log("new message server", message);
     locationCtrl.createLocation(message)
      .then(function(location){
        console.log("new message added", location);
        io.emit('location', {location});
      }).catch(e => {
        console.log("location present");
        io.emit('location-present');
      });
   });
});
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

export default app;
