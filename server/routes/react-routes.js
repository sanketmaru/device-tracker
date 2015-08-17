var Router = require('react-router');
var Route = Router.Route;
var App = require('./app/components/home');

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={App} />
    <Route name="about" handler={About} />    
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});