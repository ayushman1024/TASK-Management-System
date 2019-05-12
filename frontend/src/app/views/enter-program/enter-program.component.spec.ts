import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterProgramComponent } from './enter-program.component';

describe('EnterProgramComponent', () => {
  let component: EnterProgramComponent;
  let fixture: ComponentFixture<EnterProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
