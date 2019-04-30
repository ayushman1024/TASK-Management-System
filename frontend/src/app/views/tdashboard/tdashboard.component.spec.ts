import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdashboardComponent } from './tdashboard.component';

describe('TdashboardComponent', () => {
  let component: TdashboardComponent;
  let fixture: ComponentFixture<TdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
