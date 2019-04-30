import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MhomeComponent } from './mhome.component';

describe('MhomeComponent', () => {
  let component: MhomeComponent;
  let fixture: ComponentFixture<MhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
