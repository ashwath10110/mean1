import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approval-changes',
  templateUrl: './approval-changes.component.html',
  styleUrls: ['./approval-changes.component.css']
})
export class ApprovalChangesComponent implements OnInit {

  @Input() approvalComments = [];

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: any) {
    if (changes["approvalComments"] && (changes["approvalComments"].previousValue !== changes["approvalComments"].currentValue)) {
      this.approvalComments = changes["approvalComments"].currentValue;
    }
  }

}
