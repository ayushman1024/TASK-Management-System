import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskReviewComponent } from './new-task-review.component';

describe('NewTaskReviewComponent', () => {
  let component: NewTaskReviewComponent;
  let fixture: ComponentFixture<NewTaskReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
