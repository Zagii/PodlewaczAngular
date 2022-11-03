import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSekwencjeComponent } from './dialog-sekwencje.component';

describe('DialogSekwencjeComponent', () => {
  let component: DialogSekwencjeComponent;
  let fixture: ComponentFixture<DialogSekwencjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSekwencjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSekwencjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
