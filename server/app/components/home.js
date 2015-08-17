var React = require('react');
var Login = require('./login');
var SignUp = require('./signup');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render:function(){
    return (
      <div>
        <h1>Device Tracker Login Using React</h1>
        <Login />
        <SignUp />
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
