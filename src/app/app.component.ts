import { Component, OnInit } from '@angular/core';

import { DoveService, Tower } from './dove.service';

export interface SearchResult {
  towers: Tower[];
  autozoom: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Array of tower objects
  towers: Tower[] = [];

  searchResult: SearchResult = {towers: [], autozoom: false};

  // Bound sidenav state
  sidenavOpened = false;

  constructor(private doveService: DoveService) {}

  ngOnInit(): void {
    // Get Dove data
    this.doveService.getDove().subscribe((towers: Tower[]) => {

      // Create map of tower objects
      this.towers = [...towers];
      this.searchResult = {towers: [...towers], autozoom: true}
    });
  }

  searchEvent(result: SearchResult): void {
    this.searchResult = result;
  }

  mapButtonEvent(event: string): void {
    if (event === "search")
      this.sidenavOpened = true;
  }
}
