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
  unringableList: string[] = ["Include", "Exclude"];
  weightList: number[] = [0, 5, 10, 15, 20]
  practiceList: string[] = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Selection values
  name: string = "";
  county: string = "";
  bells: number = 0;
  unringable: string = "Exclude";
  weight: number = 0;
  practice: string = "";

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
  }

  selectionChange() {
    let towers = [...this.towers];

    // Filter on name
    if (this.name !== "")
      towers = towers.filter(tower => tower.name.toLowerCase().startsWith(this.name.toLowerCase()))

    // Filter on county
    if (this.county != "")
      towers = towers.filter(tower => this.county === tower.county)

    // Filter on number of bells
    if (this.bells > this.bellsList[0])
      towers = towers.filter(tower => tower.bells >= this.bells);

    // Filter on weight
    if (this.weight > 0)
      towers = towers.filter(tower => (tower.weight / 112) >= this.weight);

    this.searchUpdate.emit(towers.map(tower => tower.id));
  }

  clearName() {
    this.name = "";
    this.selectionChange();
  }
}
