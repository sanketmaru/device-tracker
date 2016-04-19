import React from 'react';
import ReactDOM from 'react-dom';
import GeoLocation from '../geolocation/geolocation.js';
 
export default class Login extends React.Component {
  render() {
  	return (
  		<form className='signin-form'>
	  		<h2 className='form-signin-heading'>Please sign in</h2>
	      <label for='inputEmail' className='sr-only'>Email address</label>
	      <input type='email' id='inputEmail' className='form-control' placeholder='Email address' />
	      	      <label for='inputPassword' className='sr-only'>Password</label>
	      <input type='password' id='inputPassword' className='form-control' placeholder='Password' />
	      <div className='checkbox'>
	        <label><input type='checkbox' value='remember-me' /> Remember me</label>
	        
	      </div>
	      <GeoLocation />
	      <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>

	    </form>
  	)
    
  }
}

