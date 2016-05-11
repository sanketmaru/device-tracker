import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../navbar/navbar.js';


export default class Login extends React.Component {

  constructor(){
    super();
	  this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(){

  }

  render() {
  	return (

  		<div>
  		<NavBar />
  		<form>
  			<div className="form-group">
			    <label htmlFor='exampleInputEmail1'>Email address</label>
			    <input type='email' className='form-control' id='exampleInputEmail1' placeholder='Email'></input>
			  </div>
			  <div className="form-group">
			    <label htmlFor="exampleInputPassword1">Password</label>
			    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
			  </div>
	  		<button type="submit" className="btn btn-default" onClick={this._handleClick}>Signup</button>
	    </form>
  		</div>

  	)

  }
}
