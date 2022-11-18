import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCzasComponent } from './setup-czas.component';

describe('SetupCzasComponent', () => {
  let component: SetupCzasComponent;
  let fixture: ComponentFixture<SetupCzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupCzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
