import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  @Input() financeData = {};

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  @Output() validStatus: EventEmitter<any> = new EventEmitter<any>();

  financeFormGroup: FormGroup;

  @ViewChild('financeForm') financeForm;
   approvalComments = {};
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(!this.financeData){
      this.processFinance({});
    }
   
  }

  ngOnChanges(changes: any) {
    if (changes["financeData"] && (changes["financeData"].previousValue !== changes["financeData"].currentValue)) {
      this.financeData = changes["financeData"].currentValue;
      // this.financeData['approvalComments'] = {};
      this.processFinance(this.financeData || {});
    }
  }

  processFinance(obj) {
    const bankingType = obj.bankingType || "";
    const accountNo = obj.accountNo || "";
    const bankName = obj.bankName || "";
    const branchName = obj.branchName || "";
    const currency = obj.currency || "";
    const ifscCode = obj.ifscCode || "";
    const accountName = obj.accountName || "";
    const swiftCode = obj.swiftCode || "";
    const micr = obj.micr || "";
    const accountType = obj.accountType;
    this.financeFormGroup = this._formBuilder.group({
      bankingType: [
        bankingType,
        Validators.compose([Validators.required])
      ],
      accountNo: [
        accountNo,
        Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]+')])
      ],
      accountType: [
        accountType,
        Validators.compose([Validators.required])
      ],
      bankName: [
        bankName,
        Validators.compose([Validators.required])
      ],
      branchName: [
        branchName,
        Validators.compose([Validators.required])
      ],
      currency: [
        currency,
        Validators.compose([Validators.required])
      ],
      ifscCode: [
        ifscCode,
        Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]{4}[0-9]{6,7}$')])
      ],
      accountName: [
        accountName,
        Validators.compose([Validators.required])
      ],
      swiftCode: [
        swiftCode,
        Validators.compose([Validators.pattern('^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$')])
      ],
      micr: [
        micr,
        Validators.compose([Validators.pattern('^[A-Za-z]{4}[a-zA-Z0-9]{7}$')])
      ]
    });
    this.financeFormGroup.statusChanges.subscribe(
      result => {
        this.validStatus.emit(result);
      }
    );
    // this.financeFormGroup.valueChanges.subscribe(dt => this.fieldChanges(dt));
  }

  fieldChanges(dt) {
    Object.keys(dt).forEach((fieldName) => {
      if(this.financeData[fieldName] != dt[fieldName]){
        this.financeData['approvalComments'][fieldName] = this.financeData[fieldName] +" -> "+ dt[fieldName]
      }
    });
  }

  handleBankingTypeChange(event) {
    if (event.value === 'DOMESTIC') {
      this.financeFormGroup.get('swiftCode').disable();
      this.financeFormGroup.get('ifscCode').enable();
    }
    else if (event.value === 'INTERNATIONAL') {
      this.financeFormGroup.get('swiftCode').enable();
      this.financeFormGroup.get('ifscCode').disable();
    }
  }

  get isValid() {
    return this.financeFormGroup.valid;
  }

  get value() {
    return this.financeFormGroup.value;
  }

}
