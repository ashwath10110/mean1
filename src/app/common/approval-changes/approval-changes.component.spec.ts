import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalChangesComponent } from './approval-changes.component';

describe('ApprovalChangesComponent', () => {
  let component: ApprovalChangesComponent;
  let fixture: ComponentFixture<ApprovalChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
