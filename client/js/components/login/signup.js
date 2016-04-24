import React from 'react';
import ReactDOM from 'react-dom';

 
export default class Login extends React.Component {
  render() {
  	return (
  		<div>
	  		<form className='signin-form'>
		  		<h2 className='form-signin-heading'>Please sign up</h2>
		      <label for='inputEmail' className='sr-only'>Email address</label>
		      <input type='email' id='inputEmail' className='form-control' placeholder='Email address' />
		      	      <label for='inputPassword' className='sr-only'>Password</label>
		      <input type='password' id='inputPassword' className='form-control' placeholder='Password' />
		      <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign Up</button>

		    </form>
  		</div>
  		
  	)
    
  }
}


