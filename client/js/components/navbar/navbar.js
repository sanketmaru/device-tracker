import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Link } from 'react-router'

export default class Navbar extends React.Component {
	constructor() {
	  super();
	  this.goToUrl = this.goToUrl.bind(this);
	}
	goToUrl(url) {
	  alert('selected ' + selectedKey);
	}
  
  render() {
  	return (  	  	
  		<Nav bsStyle="pills" activeKey={1}>				
				<NavItem eventKey={1}><Link to="/signup">Signup</Link></NavItem>				
				<NavItem eventKey={2}><Link to="/login">Login</Link></NavItem>				
		  </Nav>  		  	
  	)    
  }
}