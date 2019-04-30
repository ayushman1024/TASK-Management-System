import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdashboardComponent } from './mdashboard.component';

describe('MdashboardComponent', () => {
  let component: MdashboardComponent;
  let fixture: ComponentFixture<MdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
