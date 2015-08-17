var React = require('react');

var Login = React.createClass({
  render:function(){
    return (
      <div>
        <form method ="post" action={this.props.handleSubmit}>
        	<input type="text" id="email"></input>
        	<input type="text" id="password"></input>
        </form>
      </div>
    );
  }
});

module.exports = Login;
