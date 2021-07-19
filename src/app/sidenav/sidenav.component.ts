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

  countyList: string[] = [];
  bellsList: number[] = [];
  unringableList: boolean[] = [false, true];
  weightList: number[] = [0, 5, 10, 15, 20]
  practiceList: string[] = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Selection values
  place: string = "";
  county: string = "";
  bells: number = 0;
  unringable: boolean = false;
  weight: number = 0;
  practice: string = "";

  // Tower data is updated
  ngOnChanges(): void {
    // Counties
    let countySet: Set<string> = new Set();
    for (const tower of this.towers)
      countySet.add(tower.county);

    this.countyList = [...countySet].sort();
    this.countyList.unshift("");

    if (!this.countyList.includes(this.county))
      this.county = this.countyList[0];

    // Number of bells
    let bellSet: Set<number> = new Set();
    for (const tower of this.towers)
      bellSet.add(tower.bells);

    this.bellsList = [...bellSet].sort((a, b) => a - b);

    if (!this.bellsList.includes(this.bells))
      this.bells = this.bellsList[0];

    this.update();
  }

  // Update search parameters
  update() {
    let towers = [...this.towers];

    // Filter on place
    if (this.place !== "")
      towers = towers.filter(tower => tower.place.toLowerCase().startsWith(this.place.toLowerCase()))

    // Filter on county
    if (this.county != "")
      towers = towers.filter(tower => this.county === tower.county)

    // Filter on number of bells
    if (this.bells > this.bellsList[0])
      towers = towers.filter(tower => tower.bells >= this.bells);

    // Filter unringable
    if (!this.unringable)
      towers = towers.filter(tower => !tower.unringable);

    // Filter on weight
    if (this.weight > 0)
      towers = towers.filter(tower => (tower.weight / 112) >= this.weight);

    // Filter on practice night
    if (this.practice != "")
      towers = towers.filter(tower => tower.practice.includes(this.practice));

    this.searchUpdate.emit(towers.map(tower => tower.id));
  }

  // Function called from place select input
  clearPlace() {
    this.place = "";
    this.update();
  }
}
