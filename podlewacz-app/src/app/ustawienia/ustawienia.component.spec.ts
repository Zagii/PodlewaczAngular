import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UstawieniaComponent } from './ustawienia.component';

describe('UstawieniaComponent', () => {
  let component: UstawieniaComponent;
  let fixture: ComponentFixture<UstawieniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UstawieniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UstawieniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
