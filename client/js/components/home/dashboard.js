import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../login/login.js';
import Signup from '../login/signup.js';
 
export default class Dashboard extends React.Component {
  render() {
  	return (
  		
  			<div className='container'>
					<ul className="nav nav-tabs">
						<li className="active"><a href="#">SignIn</a> <Login /> </li>
						<li role="presentation"><a href="#">SignUp</a> <Signup /> </li>						
					</ul>
					
				</div>
  		
  	)    
  }
}


