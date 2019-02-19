import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMediaItemComponent } from './edit-media-item.component';

describe('EditMediaItemComponent', () => {
  let component: EditMediaItemComponent;
  let fixture: ComponentFixture<EditMediaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMediaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMediaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
