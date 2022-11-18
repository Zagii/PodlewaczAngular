import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMeteoComponent } from './setup-meteo.component';

describe('SetupMeteoComponent', () => {
  let component: SetupMeteoComponent;
  let fixture: ComponentFixture<SetupMeteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMeteoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
