import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolkaWykresComponent } from './kontrolka-wykres.component';

describe('KontrolkaWykresComponent', () => {
  let component: KontrolkaWykresComponent;
  let fixture: ComponentFixture<KontrolkaWykresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolkaWykresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontrolkaWykresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
