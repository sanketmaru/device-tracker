var React = require('react');
var Authenticate = require('./authenticate');

var Login = React.createClass({

	handleSumbit: function(){
		çonsole.log("In Signup");
	},

  render:function(){
    return (
      <div>
        <h1>SignUp</h1>
        <Authenticate submit={this.handleSumbit} />
      </div>
    );
  }
});

module.exports = Login;
