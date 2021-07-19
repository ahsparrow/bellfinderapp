import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

import { Icon, LayerGroup, Map as LeafletMap, icon, layerGroup, map, marker, tileLayer } from 'leaflet';
import 'leaflet.markercluster';
import { MarkerClusterGroup } from 'leaflet';

import { Tower } from '../dove.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Input() towers: Tower[] = [];

  towerIcons: Icon[] = []
  unringableIcon = icon({
    iconUrl: "assets/icons/tower_unringable.png",
    iconSize: [31, 46],
    iconAnchor: [16, 46]
  });

  map: LeafletMap | undefined;
  markers: MarkerClusterGroup = new MarkerClusterGroup({chunkedLoading: true});

  constructor() {
    for (let x of [3, 3, 3, 4, 5, 6, 8, 8, 10, 10, 12, 12]) {
      const url = `assets/icons/tower${x}.png`;
      this.towerIcons.push(
        icon({
          iconUrl: url,
          iconSize: [31, 46],
          iconAnchor: [16, 46]
        }));
    }
  }

  ngAfterViewInit(): void {
    this.map = map('map', {
      center: [ 52.0, 0.0 ],
      zoom: 10
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.markers.addTo(this.map);
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.map)
      this.markers.clearLayers();
      const markers = this.towers.map(
        tower => marker(
          [tower.latitude, tower.longitude],
          {icon: (tower.unringable) ?
            this.unringableIcon :
            this.towerIcons[Math.min(11, tower.bells) - 1]}));

      this.markers.addLayers(markers);
  }

}
