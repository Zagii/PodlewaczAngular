import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SekwencjeComponent } from './sekwencje.component';

describe('SekwencjeComponent', () => {
  let component: SekwencjeComponent;
  let fixture: ComponentFixture<SekwencjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SekwencjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SekwencjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
