import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTrackerComponent } from './fuel-tracker.component';

describe('FuelTrackerComponent', () => {
  let component: FuelTrackerComponent;
  let fixture: ComponentFixture<FuelTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
