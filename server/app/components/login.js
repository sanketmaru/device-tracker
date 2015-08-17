var React = require('react');
var Authenticate = require('./authenticate');

var Login = React.createClass({
	
	handleSumbit: function(){
		çonsole.log("In Login");
	},

  render:function(){
    return (
      <div>
        <h1>Login</h1>
        <Authenticate submit={this.handleSumbit}/>
      </div>
    );
  }
});

module.exports = Login;
