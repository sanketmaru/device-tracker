import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { MapService } from "../services/map.service";
import { UserService } from "../services/user.service";
import { SocketService } from "../services/socket.service";
import { GeocodeService } from '../services/geocode.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  observable: Observable<any>;
  leafletIcon : any;
  locations = [];
  connection: Observable<any>;

  constructor(private mapService: MapService, private geoCodeService: GeocodeService, private socketService:SocketService, private userService: UserService) {
    this.leafletIcon = L.icon( { iconUrl: 'assets/marker-icon.png', shadowUrl: 'assets/marker-shadow.png' } );
  }

  ngOnInit() {
    this.initializeMap();
    this.subscribeGeoLocation();
    this.updateLocations();
  }

  initializeMap() {
    //TODO: should be moved to map service
    let map = L.map("map", {
          zoomControl: false,
          center: L.latLng(51.505, -0.09), // default location as London
          zoom: 12,
          minZoom: 4,
          maxZoom: 19,
          layers: [this.mapService.baseMaps.Esri]
    });
    this.mapService.map = map;
    L.control.zoom({ position: "topright" }).addTo(map);
    L.marker(map.getCenter()).addTo(map),
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);
  }

  subscribeGeoLocation() {

    // subscribe to the observable
    this.observable = this.geoCodeService.geoCodeNotification$;
    this.observable.subscribe(
        data => {
          var latlng = L.latLng(data.lat, data.lng);
          var marker = L.marker([data.lat,data.lng], {icon: this.leafletIcon}).addTo(this.mapService.map)
          this.mapService.map.panTo(latlng);
          this.socketService.sendMessage({
            lat : data.lat.toFixed(2), // send upto two decimal places
            lng : data.lng.toFixed(2),
            userId : JSON.parse(localStorage.getItem('user')).id
          });
        }
    );
    this.geoCodeService.getCurrentLocation();

  }

  updateLocations() {

    // update it via sockets
    this.connection = this.socketService.socketObservable$;
    this.connection.subscribe(location => {
      this.locations.push(location);
    });

    // update locations to get from api
    let selectedUser = this.userService.getSelectedUser();
    if(selectedUser && selectedUser._id) {
      this.geoCodeService.getUserLocations(selectedUser._id)
        .subscribe(data => {
          console.log(data);
        });
    }


  }



}
