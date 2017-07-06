import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class GeocodeService {

  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  getCurrentLocation() {

    function geo_success(position) {
      console.log('currentPosition', postition);
      var lat = position.coords.latitude;
      var lng = position.coords.latitude;
      //http://maps.googleapis.com/maps/api/geocode/json?latlng=lat,lng;
    }

    function geo_error() {
      alert("Sorry, no position available.");
    }

    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error);

  }

}
