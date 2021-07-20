import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerDialogComponent } from './tower-dialog.component';

describe('TowerDialogComponent', () => {
  let component: TowerDialogComponent;
  let fixture: ComponentFixture<TowerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TowerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
