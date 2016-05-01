import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'


export default class Navbar extends React.Component {
	constructor() {
	  super();
	  this.goToUrl = this.goToUrl.bind(this);
	}
	goToUrl(path) {
	 	browserHistory.push(path);
	}
  
  render() {
  	return (
	  	<ul className="nav nav-pills">
			  <li role="presentation">
			  	<Link to='/signup'>
			  	signup
			  	</Link>
			  </li>
			  <li role="presentation">
			  	<Link to='/login'>
			  	login
			  	</Link>
			  </li>		  
			</ul>  	  	  		
  	)    
  }
}