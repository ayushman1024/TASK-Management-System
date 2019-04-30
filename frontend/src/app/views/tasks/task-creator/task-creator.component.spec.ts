import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatorComponent } from './task-creator.component';

describe('TaskCreatorComponent', () => {
  let component: TaskCreatorComponent;
  let fixture: ComponentFixture<TaskCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
