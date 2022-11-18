import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramyMaualComponent } from './programy-maual.component';

describe('ProgramyMaualComponent', () => {
  let component: ProgramyMaualComponent;
  let fixture: ComponentFixture<ProgramyMaualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramyMaualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramyMaualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
