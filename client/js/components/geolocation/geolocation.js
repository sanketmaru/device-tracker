import React from 'react';
import ReactDOM from 'react-dom';
 
export default class Login extends React.Component {

	 constructor() {
	  super();
	  this._handleClick = this._handleClick.bind(this);
	 }
	
	_handleGeoPosition(position){
		console.log(position.coords);
	}

	_handleClick(event){
		event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._handleGeoPosition);
    }
	}

  render() {
  	return (
  		<a href="#" onClick={this._handleClick}>Detect location</a>
  	)
    
  }
}


