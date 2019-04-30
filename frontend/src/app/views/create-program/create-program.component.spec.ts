import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramComponent } from './create-program.component';

describe('CreateProgramComponent', () => {
  let component: CreateProgramComponent;
  let fixture: ComponentFixture<CreateProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
