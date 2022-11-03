import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolkaCzasComponent } from './kontrolka-czas.component';

describe('KontrolkaCzasComponent', () => {
  let component: KontrolkaCzasComponent;
  let fixture: ComponentFixture<KontrolkaCzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolkaCzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontrolkaCzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
