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

  constructor(private doveService: DoveService) {}

  ngOnInit(): void {
    // Get Dove data
    this.doveService.getDove().subscribe((towers: Tower[]) => {

      // Create map of tower objects
      this.towers = [...towers];
      this.displayed = [...towers];
    });
  }

  searchUpdate(towerIds: number[]) {
    this.displayed = this.towers.filter(tower => towerIds.includes(tower.id));
  }
}
