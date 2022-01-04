import { Component, OnInit } from '@angular/core';

import { DoveService, Tower } from './dove.service';
import { Settings } from './sidenav/sidenav.component';

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

  settings: Settings | undefined = undefined;

  // Bound sidenav opened states
  sidenavOpened = false;

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

  mapButtonEvent(event: string): void {
    if (event === "search")
      this.sidenavOpened = !this.sidenavOpened;
  }
}
