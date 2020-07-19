
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class GeocodeService {

  // expose to component
  geoCodeNotification$: Observable<any>;

  private geoCodeObserver: Observer<any>;

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.geoCodeNotification$ = new Observable(observer => this.geoCodeObserver = observer);
  }

  getCurrentLocation() {

    function geo_success(position) {
      console.log('currentPosition', position);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.geoCodeObserver.next({
          lat : lat,
          lng : lng
      });
      // http://maps.googleapis.com/maps/api/geocode/json?latlng=lat,lng;
    }

    function geo_error() {
      alert('Sorry, no position available.');
    }
    const options = {
      enableHighAccuracy: false,
      timeout: 120000,
      maximumAge: 0
    };
    const wpid = navigator.geolocation.watchPosition(geo_success.bind(this), geo_error, options);

  }

  getUserLocations(userId): Observable<any> {
    const userLocationUrl = environment.locations + `/${userId}`;
    return this.http.get(userLocationUrl).pipe(
      map(res => res));

  }

}
