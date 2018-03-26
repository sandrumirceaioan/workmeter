import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAssignedComponent } from './tasks-assigned.component';

describe('TasksAssignedComponent', () => {
  let component: TasksAssignedComponent;
  let fixture: ComponentFixture<TasksAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
