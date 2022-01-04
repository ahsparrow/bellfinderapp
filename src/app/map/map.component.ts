import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-easybutton';

import { TowerDialogComponent } from '../tower-dialog/tower-dialog.component';

// Custom marker to contain tower data
class TowerMarker extends L.Marker {
  tower: Tower

  constructor(latLng: L.LatLngExpression, tower: Tower, options?: L.MarkerOptions) {
    super(latLng, options);
    this.tower = tower;
  }
}

import { Tower } from '../dove.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {

  // List of all towers
  @Input() towers: Tower[] = [];

  // The selected tower
  @Input() selected: Tower | undefined = undefined;

  // Button pressed event
  @Output() buttonEvent = new EventEmitter<string>();

  towerIcons: L.Icon[] = []
  unringableIcon = L.icon({
    iconUrl: "assets/icons/tower_unringable.png",
    shadowUrl: "assets/icons/tower_shadow.png",
    iconSize: [27, 40],
    iconAnchor: [14, 40],
    shadowSize: [31, 21],
    shadowAnchor: [4, 21]
  });

  map: L.Map | undefined;
  markers: L.MarkerClusterGroup = new L.MarkerClusterGroup();

  constructor(public dialog: MatDialog) {
    // Make array of icons
    for (const x of [3, 3, 3, 4, 5, 6, 8, 8, 10, 10, 12, 12]) {
      const url = `assets/icons/tower${x}.png`;
      this.towerIcons.push(
        L.icon({
          iconUrl: url,
          shadowUrl: "assets/icons/tower_shadow.png",
          iconSize: [27, 40],
          iconAnchor: [14, 40],
          shadowSize: [31, 21],
          shadowAnchor: [4, 21]
        })
      );
    }
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [ 52.0, 0.0 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.markers.addTo(this.map);

    L.easyButton(
      '<i class="material-icons" style="font-size: 18px; vertical-align: middle">search</i>',
      () => this.buttonEvent.emit("search")
    ).addTo(this.map);

    this.map.on("moveend", () => this.moveEnd());
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === "towers" && this.map) {
        // Zoom to fit all towers
        this.map.fitBounds(this.towerBounds(this.towers));

      } else if (propName === "selected" && this.selected) {
        this.selectTower(this.selected, 14);
      }
    }
  }

  // Map has finished moving/zooming
  moveEnd(): void {
    this.markers.clearLayers();
    this.loadMarkers();
  }

  loadMarkers(): void {
    const towers = this.visibleTowers();

    const markers = towers.map(
      tower => new TowerMarker(
        [tower.latitude, tower.longitude],
        tower,
        {
          icon: (tower.unringable) ?
            this.unringableIcon :
            this.towerIcons[Math.min(11, tower.bells) - 1],
          title: tower.place
        }
      ).on('click', this.onClick, this)
    );

    this.markers.addLayers(markers);
  }

  visibleTowers(): Tower[] {
    if (this.map) {
      const bounds = this.map.getBounds();

      const towers = this.towers.filter(t => bounds.contains([t.latitude, t.longitude]));
      return towers;
    }
    else
      return [];
  }

  selectTower(tower: Tower, zoom: number): void {
    if (this.map)
        this.map.setView([tower.latitude, tower.longitude], zoom);
  }

  onClick(event: L.LeafletEvent): void {
    this.dialog.open(TowerDialogComponent, {data: event.target.tower});
  }

  // Return bounding box of towers
  towerBounds(towers: Tower[]): L.LatLngBounds {
    var maxLat = -90;
    var minLat = 90;
    var maxLon = -180;
    var minLon = 180;

    for (const tower of towers) {
      maxLat = Math.max(maxLat, tower.latitude);
      minLat = Math.min(minLat, tower.latitude);
      maxLon = Math.max(maxLon, tower.longitude);
      minLon = Math.min(minLon, tower.longitude);
    }

    return L.latLngBounds([minLat, minLon], [maxLat, maxLon]);
  }


}
