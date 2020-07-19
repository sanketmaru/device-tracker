import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';

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
		this.leafletIcon = L.icon({ iconUrl: 'assets/marker-icon.png', shadowUrl: 'assets/marker-shadow.png' });
    this.markers = new L.FeatureGroup(this.baseMaps);
   }

   initializeMap(lat, lng) {
     if(this.map){
      this.map.remove();
     }
      
      let map = L.map("map", {
        center:[lat, lng], // default location as passed latlng which is currentPosition
        zoom: 18,
        layers: [this.baseMaps.Esri]
      });
      
      this.map = map;
      L.marker(this.map.getCenter(), {icon: this.leafletIcon}).addTo(this.map),
      L.control.layers(this.baseMaps).addTo(this.map);
      L.control.scale().addTo(this.map);
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
