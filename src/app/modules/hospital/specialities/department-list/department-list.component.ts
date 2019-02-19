import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent {

  @Input()
  departmentsList = [];

  @Output()
  deleteDepartment: EventEmitter<string> = new EventEmitter();

  @Output()
  editDepartment: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  deleteDepartmentFn(department: any) {
    this.deleteDepartment.emit(department);
  }

}
