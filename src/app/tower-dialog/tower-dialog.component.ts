import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Tower } from '../dove.service';
@Component({
  selector: 'app-tower-dialog',
  templateUrl: './tower-dialog.component.html',
  styleUrls: ['./tower-dialog.component.css']
})
export class TowerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public tower: Tower) {}

  weight(): string {
    const cwt = Math.floor(this.tower.weight / 112);
    let lb = this.tower.weight % 112;
    const qr = Math.floor(lb / 28);
    lb = lb % 28;
    return cwt + '-' + qr + '-' + lb + " cwt";
  }
}
