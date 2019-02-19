import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMediaComponent } from './unit-media.component';

describe('UnitMediaComponent', () => {
  let component: UnitMediaComponent;
  let fixture: ComponentFixture<UnitMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
