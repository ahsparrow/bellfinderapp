import { Component, OnInit } from '@angular/core';

import { DoveService, Tower } from './dove.service';

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

  searchUpdate(towerIds: number[]): void {
    this.displayed = this.towers.filter(tower => towerIds.includes(tower.id));
  }

  selectTower(tower: Tower): void {
    this.selected = tower;
  }

  mapButtonEvent(event: string): void {
    if (event === "search")
      this.sidenavOpened = !this.sidenavOpened;

    if (event === "towers")
      this.towersOpened = !this.towersOpened;
  }
}
