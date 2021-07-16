import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatSelect} from '@angular/material/select';
import { Tower } from '../dove.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnChanges {
  // Array of tower information
  @Input() towers: Tower[] = [];

  // Emit list of tower ids to be displayed
  @Output() searchUpdate = new EventEmitter<number[]>();

  // List of all counties
  counties: string[] = [];

  // Selection values
  county: string = "";

  ngOnChanges(): void {
    // Make alphabetic list of unique counties
    let countySet: Set<string> = new Set();
    for (const tower of this.towers)
      countySet.add(tower.county);

    this.counties = [...countySet].sort();
  }

  countyChange() {
    // Get towers matching selected county
    let ids: number[] = this.towers
      .filter(tower => tower.county === this.county)
      .map(tower => tower.id);
    this.searchUpdate.emit(ids);
  }
}
