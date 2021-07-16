import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

import { LayerGroup, Map as LeafletMap, layerGroup, map, marker, tileLayer } from 'leaflet';
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

  map: LeafletMap | undefined;
  markers: MarkerClusterGroup = new MarkerClusterGroup({chunkedLoading: true});

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
  }

  ngOnChanges() {
    if (this.map)
      this.markers.clearLayers();

      const markers = this.towers.map(tower => marker([tower.latitude, tower.longitude]));
      this.markers.addLayers(markers);
  }

}
