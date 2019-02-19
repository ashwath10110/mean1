import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifileuploadComponent } from './multifileupload.component';

describe('MultifileuploadComponent', () => {
  let component: MultifileuploadComponent;
  let fixture: ComponentFixture<MultifileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultifileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultifileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
