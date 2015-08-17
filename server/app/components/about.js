var React = require('react');
var Login = require('./login');
var SignUp = require('./signup');

var App = React.createClass({
  render:function(){
    return (
      <div>
        <h1>Device Tracker App Using React, Express, Mongoose, Socketio , google maps</h1>
      </div>
    );
  }
});

module.exports = App;
