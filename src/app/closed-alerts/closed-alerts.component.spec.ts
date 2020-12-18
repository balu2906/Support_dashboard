import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedAlertsComponent } from './closed-alerts.component';

describe('ClosedAlertsComponent', () => {
  let component: ClosedAlertsComponent;
  let fixture: ComponentFixture<ClosedAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
