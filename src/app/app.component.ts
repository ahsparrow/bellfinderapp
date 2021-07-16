import { Component, OnInit } from '@angular/core';

import { DoveService, Tower } from './dove.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Map of tower objects
  dove: Tower[] = [];

  // Array of towers to display
  dislayed: Tower[] = [];

  constructor(private doveService: DoveService) {}

  ngOnInit(): void {
    // Get Dove data
    this.doveService.getDove().subscribe((dove: Tower[]) => {

      // Create map of tower objects
      this.dove = [...dove];
    });
  }

  searchUpdate(towerIds: number[]) {
    console.log(towerIds);
  }
}
