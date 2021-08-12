import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tower } from '../dove.service';

export type TowerEvent = {
  tower: Tower;
  autoClose: boolean;
}

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css']
})
export class TowersComponent implements OnChanges, OnInit {

  @Input() towers: Tower[] = [];
  @Input() visibleTowers: Tower[] = [];

  @Output() selectTower = new EventEmitter<TowerEvent>();

  displayed: Tower[] = []

  sortByList: string[] = ['Place', 'Bells', 'Weight'];
  sortBy = 'Place'

  autoClose = false;
  showOnlyVisible = false;

  ngOnInit(): void {
    this.autoClose = JSON.parse(localStorage.getItem('autoClose') || 'false');
    this.showOnlyVisible = JSON.parse(localStorage.getItem('showOnlyVisible') || 'false');
    this.sortBy = localStorage.getItem('sortBy') || 'Place';
  }

  ngOnChanges(): void {
    // Make big enough to show all the towers in Devon
    this.displayed = this.towers.slice(0, 500).sort(this.sortFactory());
  }

  onClick(tower: Tower): void {
    this.selectTower.emit({tower: tower, autoClose: this.autoClose});
  }

  cwt(lbs: number) {
    return Math.floor(lbs / 112);
  }

  searchUpdate(): void {
    localStorage.setItem('sortBy', this.sortBy);
    localStorage.setItem('autoClose', JSON.stringify(this.autoClose));
    localStorage.setItem('showOnlyVisible', JSON.stringify(this.showOnlyVisible));
    this.displayed.sort(this.sortFactory());
  }

  sortFactory() {
    const fn = (this.sortBy == 'Bells') ? this.sortByBells : (
      (this.sortBy == 'Weight') ? this.sortByWeight : this.sortByPlace);

    return fn;
  }

  sortByBells(a: Tower, b: Tower): number {
    return (a.bells == b.bells) ? (b.weight - a.weight) : (b.bells - a.bells);
  }

  sortByWeight(a: Tower, b: Tower): number {
    return b.weight - a.weight;
  }

  sortByPlace(a: Tower, b: Tower): number {
    return (a.place == b.place) ? 0 : (a.place > b.place) ? 1 : -1;
  }
}
