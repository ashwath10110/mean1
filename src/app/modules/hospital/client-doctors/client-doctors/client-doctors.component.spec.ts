import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDoctorsComponent } from './client-doctors.component';

describe('ClientDoctorsComponent', () => {
  let component: ClientDoctorsComponent;
  let fixture: ComponentFixture<ClientDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
