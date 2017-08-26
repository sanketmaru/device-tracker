import { Component, OnInit } from '@angular/core';
import { MapService } from "../services/map.service";
import { UserService } from "../services/user.service";
import { SocketService } from "../services/socket.service";
import { GeocodeService } from '../services/geocode.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  observable: Observable<any>;

  locations = [];
  connection: Observable<any>;

  constructor(private mapService: MapService, private geoCodeService: GeocodeService, private socketService:SocketService, private userService: UserService) {

  }

  ngOnInit() {

    this.subscribeGeoLocation();
    this.updateLocations();
  }

  subscribeGeoLocation() {

    // subscribe to the observable
    this.observable = this.geoCodeService.geoCodeNotification$;
    this.observable.subscribe(
        data => {

          var lat = data.lat.toFixed(2);
          var lng = data.lng.toFixed(2);

          this.socketService.sendMessage({
            lat ,
            lng ,
            userId : JSON.parse(localStorage.getItem('user'))._id
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
    let selectedUser = this.userService.getSelectedUser() || JSON.parse(localStorage.getItem('user'));
    if(selectedUser && selectedUser._id) {
      this.geoCodeService.getUserLocations(selectedUser._id)
        .subscribe(data => {
          this.locations = data;
          if(this.locations && this.locations.length) {
            let loc = this.locations[0];
            this.mapService.initializeMap(loc.lat, loc.lng);
          }

          console.log(data);
        });
    }
  }

  view(data) {
    this.mapService.addMarker(data);
  }



}
