import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { State, selectHomeState } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ActionGetTenantUnits } from '@app/state/units/units.actions';
import { selectUnits } from '@app/state/units/units.selectors';
import { PartnerUtils } from '@app/utils/partner-utils';


@Component({
    selector: 'anms-partner-info',
    templateUrl: './partner-info.component.html',
    styleUrls: ['./partner-info.component.scss']
  })

  export class PartnerInfoComponent implements OnInit {
    @Input()
    partnerInfo: any;
  
    partnerInfoFormGroup: FormGroup;
    @Input()
    tenantId: any;
    @Input()
    partnerRole: any;
  
    @Input()
    partnerType: any;
  
    @Output()
    updates: EventEmitter<any> = new EventEmitter<any>();

    private unsubscribe$: Subject<void> = new Subject<void>();
    hospitalUnits: any; 
    partnerTypes: any =[];
    roles: any;
    stocks: any;
    constructor(private _formBuilder: FormBuilder, public store: Store<State>,private updates$: Actions) {
      this.roles = PartnerUtils.getRoles();
      this.partnerTypes = PartnerUtils.getPartnerTypesList();
     }

    getHospitalUnitsList(){
     const unitData = this.stocks.unitsList;
     const finalArray = []; 
     unitData && unitData.forEach(data => {
       const unit = PartnerUtils.createHospitalUnit(data);
        finalArray.push(unit);
     });
     this.hospitalUnits = finalArray;
    }

    populatePartnerInfo(mode, obj){
    let  partnerName = obj.partnerName || "";
    let partnerType = obj.partnerType || "";
    let role = obj.role || "";
    let hospitalUnit = obj.hospitalUnit || "";
    let cin = obj.cin || "";
    let pan = obj.pan || "";
    let gstin = obj.gstin || "";
   
    this.partnerInfoFormGroup.patchValue({
      name: partnerName,
      partnerType: partnerType,
      PartnerRole: role,
      unitId: hospitalUnit,
      cin: cin,
      pan: pan,
      gstin: gstin
    });
    }

    onSubmitPartnerInfo(event){
      const value = {
        ...event.value,
        statusForUpdate: 'post'
      };

      this.updates.emit({
        name: 'update-partner-info',
        value: value
      })
    }
    ngOnInit() {
      // this.store.dispatch(
      //   new ActionGetTenantUnits({
      //     tenantId: this.tenantId
      //   })
      // );
      this.store
      .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks;
        this.getHospitalUnitsList();
      });
     
      const alphaNumericRegex = '^[a-z0-9A-Z]*$';
      this.partnerInfoFormGroup = this._formBuilder.group({
        unitId: ['', Validators.required],
        name: ['', [Validators.required, Validators.maxLength(30)]],
        partnerType: ['', Validators.required],
        partnerRole: ['', Validators.required],
        cin: ['', [Validators.required, Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')  , Validators.maxLength(21)]],
        gstin: ['', [Validators.required, Validators.maxLength(21), Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
        pan: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')]],
      });

      if(!this.partnerInfo){

      } else {
        this.populatePartnerInfo('new', this.partnerInfo);
      }

     
    }
  
  }
