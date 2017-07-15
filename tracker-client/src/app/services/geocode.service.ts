import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class GeocodeService {

  // expose to component
  geoCodeNotification$: Observable<any>;

  private geoCodeObserver: Observer<any>;

  http: Http;

  constructor(http: Http) {
    this.http = http;
    this.geoCodeNotification$ = new Observable(observer => this.geoCodeObserver = observer).share();
  }

  getCurrentLocation() {

    function geo_success(position) {
      console.log('currentPosition', position);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      this.geoCodeObserver.next({
          lat : lat,
          lng : lng
      });
      //http://maps.googleapis.com/maps/api/geocode/json?latlng=lat,lng;
    }

    function geo_error() {
      alert("Sorry, no position available.");
    }

    var wpid = navigator.geolocation.watchPosition(geo_success.bind(this), geo_error);

  }

}
