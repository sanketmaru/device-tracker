import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(private mapService: MapService) {
    }

  ngOnInit() {
    //let mymap = L.map('map').setView([51.505, -0.09], 13);
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
      L.control.layers(this.mapService.baseMaps).addTo(map);
      L.control.scale().addTo(map);
    
  }

}
