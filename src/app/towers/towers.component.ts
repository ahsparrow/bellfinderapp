import { Component, Input, OnChanges } from '@angular/core';
import { Tower } from '../dove.service';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css']
})
export class TowersComponent implements OnChanges {

  @Input() towers: Tower[] = [];

  displayed: Tower[] = []

  ngOnChanges(): void {
    // Make big enough to show all the towers in Devon
    this.displayed = this.towers.slice(0, 500);
  }
}
