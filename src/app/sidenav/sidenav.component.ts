import { Component, EventEmitter, Input, OnChanges,
         Output } from '@angular/core';
import { Tower } from '../dove.service';
import { SearchResult } from '../app.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnChanges {
  // Array of tower information
  @Input() towers: Tower[] = [];

  // Emit list of tower ids to be displayed
  @Output() searchEvent = new EventEmitter<SearchResult>();

  @Output() closeEvent = new EventEmitter<null>();

  countyList: string[] = [];
  bellsList: number[] = [];
  unringableList: boolean[] = [false, true];
  weightList: number[] = [0, 5, 10, 15, 20];
  practiceList: string[] = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Selection values
  place = "";
  county = "";
  bells = 0;
  unringable = false;
  weight = 0;
  practice = "";

  autozoom = true;

  // Tower data is updated
  ngOnChanges(): void {
    // Counties
    const countySet: Set<string> = new Set();
    for (const tower of this.towers)
      countySet.add(tower.county);

    this.countyList = [...countySet].sort();
    this.countyList.unshift("");

    if (!this.countyList.includes(this.county))
      this.county = this.countyList[0];

    // Number of bells
    const bellSet: Set<number> = new Set();
    for (const tower of this.towers)
      bellSet.add(tower.bells);

    this.bellsList = [...bellSet].sort((a, b) => a - b);

    if (!this.bellsList.includes(this.bells))
      this.bells = this.bellsList[0];

    this.searchUpdate();
  }

  // Update search parameters
  searchUpdate(): void {
    let towers = [...this.towers];

    // Filter...
    const filt = this.makeFilter(this.place, this.county, this.bells,
                               this.unringable, this.weight, this.practice);
    towers = towers.filter(filt);

    this.searchEvent.emit({towers: towers, autozoom: this.autozoom});
  }

  // Function called from place select input
  clearPlace(): void {
    this.place = "";
    this.searchUpdate();
  }

  // Create filter function
  makeFilter(place: string, county: string, bells: number,
             unringable: boolean, weight: number, practice: string) {

    return function(tower: Tower): boolean {
      return (place === "" ||
              tower.place.toLowerCase().startsWith(place.toLowerCase())) &&
             (county === "" || county === tower.county) &&
             (tower.bells >= bells) &&
             (unringable || !tower.unringable) &&
             (tower.weight >= weight * 112) &&
             (practice === "" || tower.practice.includes(practice));
    };
  }

  close() {
    this.closeEvent.emit();
  }

  clearAll() {
    this.place = "";
    this.county = "";
    this.bells = this.bellsList[0];
    this.unringable = false;
    this.weight = 0;
    this.practice = "";

    this.searchUpdate();
  }
}
