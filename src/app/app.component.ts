import { Component, OnInit } from '@angular/core';

import { DoveService, Tower } from './dove.service';
import { Settings } from './sidenav/sidenav.component';
import { TowerEvent } from './towers/towers.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Array of tower objects
  towers: Tower[] = [];

  // Array of towers to display
  displayed: Tower[] = [];

  // Tower selected from tower list
  selected: Tower | undefined = undefined;

  settings: Settings | undefined = undefined;

  // Bound sidenav opened states
  sidenavOpened: boolean = false;
  towersOpened: boolean = false;

  constructor(private doveService: DoveService) {}

  ngOnInit(): void {
    // Get Dove data
    this.doveService.getDove().subscribe((towers: Tower[]) => {

      // Create map of tower objects
      this.towers = [...towers];
      this.displayed = [...towers];
    });
  }

  searchUpdate(towers: Tower[]): void {
    this.displayed = towers;
  }

  settingsUpdate(settings: Settings): void {
    this.settings = settings;
  }

  selectTower(towerEvent: TowerEvent): void {
    this.selected = towerEvent.tower;
    if (towerEvent.autoClose)
      this.towersOpened = false;

    if (this.settings && this.settings.autoclose)
      this.towersOpened = false;
  }

  mapButtonEvent(event: string): void {
    if (event === "search")
      this.sidenavOpened = !this.sidenavOpened;

    if (event === "towers")
      this.towersOpened = !this.towersOpened;
  }
}
