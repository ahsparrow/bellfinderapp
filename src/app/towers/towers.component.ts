import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Tower } from '../dove.service';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css']
})
export class TowersComponent implements OnChanges {

  @Input() towers: Tower[] = [];

  @Output() clicked = new EventEmitter<Tower>();

  displayed: Tower[] = []

  ngOnChanges(): void {
    // Make big enough to show all the towers in Devon
    this.displayed = this.towers.slice(0, 500);
  }

  onClick(tower: Tower): void {
    this.clicked.emit(tower);
  }

  cwt(lbs: number) {
    return Math.floor(lbs / 112);
  }
}
