import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Map} from "leaflet";
import * as L from 'leaflet';

@Injectable()
export class MapService {

  public map: Map;
  public baseMaps: any;
  private vtLayer: any;
	private leafletIcon : any;
	private markers : any;

  constructor() {
    this.baseMaps = {
      OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }),
      Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }),
      CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      })
    };
		this.leafletIcon = L.icon( { iconUrl: 'assets/marker-icon.png', shadowUrl: 'assets/marker-shadow.png' } );

		this.markers = new L.FeatureGroup(this.baseMaps);

   }

   initializeMap() {

    let map = L.map("map", {
          zoomControl: false,
          center: L.latLng(-0.09, 51.505), // default location as London
          zoom: 12,
          minZoom: 4,
          maxZoom: 19,
          layers: [this.baseMaps.Esri]
    });
    this.map = map;
    L.control.zoom({ position: "topright" }).addTo(map);
    L.marker(map.getCenter()).addTo(map),
    L.control.layers(this.baseMaps).addTo(map);
    L.control.scale().addTo(map);
   }

   addMarker(data) {
		this.markers.clearLayers();
    var latlng = L.latLng(data.lat, data.lng);
		var marker = L.marker([data.lat,data.lng], {icon: this.leafletIcon}).addTo(this.map);
		this.markers.addLayer(marker);
		this.map.addLayer(this.markers);
    this.map.panTo(latlng);
   }

   getMap() {
    return this.map;
   }

}
