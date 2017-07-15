import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {MapService} from "../services/map.service";
import { GeocodeService } from '../services/geocode.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  observable: Observable<any>;

  constructor(private mapService: MapService, private geoCodeService: GeocodeService) {

  }

  ngOnInit() {



    let map = L.map("map", {
          zoomControl: false,
          center: L.latLng(51.505, -0.09),
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

    // subscribe to the observable
    this.observable = this.geoCodeService.geoCodeNotification$;
    this.observable.subscribe(
        data => {
          var latlng = L.latLng(data.lat, data.lng);
          var marker = L.marker([data.lat,data.lng]).addTo(this.mapService.map)
          this.mapService.map.panTo(latlng, 12);
        }
    );
    this.geoCodeService.getCurrentLocation();
  }
}
