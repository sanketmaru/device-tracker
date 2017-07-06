import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class GeocodeService {

  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  getCurrentLocation() {
      
  }

}
