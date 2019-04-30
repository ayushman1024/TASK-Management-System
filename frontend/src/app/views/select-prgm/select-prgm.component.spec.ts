import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrgmComponent } from './select-prgm.component';

describe('SelectPrgmComponent', () => {
  let component: SelectPrgmComponent;
  let fixture: ComponentFixture<SelectPrgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPrgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPrgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
