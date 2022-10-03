import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramyComponent } from './programy.component';

describe('ProgramyComponent', () => {
  let component: ProgramyComponent;
  let fixture: ComponentFixture<ProgramyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
