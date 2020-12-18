import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAlertsComponent } from './open-alerts.component';

describe('OpenAlertsComponent', () => {
  let component: OpenAlertsComponent;
  let fixture: ComponentFixture<OpenAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
