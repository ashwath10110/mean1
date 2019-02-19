import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'anms-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  tenantInfoFormGroup: FormGroup;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  attachmentIds = [];

  uploadStatus = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    this.tenantInfoFormGroup = this._formBuilder.group({
      name: [
        null,
        Validators.compose([
          Validators.pattern("^[a-zA-Z0-9 ,']+$")
        ])
      ],
      type: [
        "SINGLE",
      ],
      cin: [
        "",
        Validators.compose([
          Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')
        ])
      ],
      // licenseNumber: [
      //   "",
      // ],
      gstin: [
        "",
        Validators.compose([
          Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
        ])
      ],
      pan: [
        "",
        Validators.compose([Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')])
      ],
    });
  }

  handleFileUpload(evt) {
    if (evt.status === "UPLOAD_SUCCESSFULL") {
      this.attachmentIds = evt.attachmentIds;
      this.uploadStatus = true;
    }
  }

  loadDummyValidData() {
    this.tenantInfoFormGroup = this._formBuilder.group({
      name: [
        "Name"
      ],
      type: [
        "MULTIPLE",
      ],
      cin: [
        "L17110MH1973PLC019786",
        Validators.compose([
          Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')
        ])
      ],
      // licenseNumber: [
      //   "29ABCDE1234F2Z5",
      // ],
      gstin: [
        "29ABCDE1234F2Z5",
        Validators.compose([
          Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
        ])
      ],
      pan: [
        "ABCDE1234F",
        Validators.compose([Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')])
      ]
    });
  }

  onSubmitTenantInfo(event) {
    const value = {
      ...event.value,
      statusForUpdate: 'post'
    };
    this.updates.emit({
      name: "update-client-info",
      value: value
    });
  }

}
