import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@app/state/home/home.state';
import { selectLocations } from '@app/state/locations/locations.selectors';
import { ActionGetCountryIdStateIdByCityId, ActionGetCountryStateCity, ActionGetCountry, ActionGetStateByCountryId, ActionGetCityByStateId, ActionGetCountryIdStateIdByCityIdSuccess, LocationsActionTypes, ActionClearAddressState } from '@app/state/locations/locations.actions';

// @Component({
//   selector: 'app-address',
//   templateUrl: './address.component.html',
//   styleUrls: ['./address.component.scss'],
// })
// export class AddressComponent implements OnInit {

//   private unsubscribe$: Subject<void> = new Subject<void>();

//   defAddress: any = {
//     address1: null,
//     address2: null,
//     city: "0",
//     state: "0",
//     country: "0",
//     pincode: null
//   };
//   selectedLocationIdDetails: any;
//   countries: any;
//   states: any;
//   cities: any;
//   selectedCountry: any;
//   selectedCity: any;
//   selectedState: any;

//   countryList = [];
//   stateList = [];
//   cityList = [];

//   @Input() address: any = this.defAddress;

//   @Input() showSave = false;

//   @Input() locationId: any = 1;

//   isLoaded = false;

//   @Output() addressChange = new EventEmitter();

//   constructor(
//     public store: Store<State>,
//     private updates$: Actions,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.store
//       .pipe(select(selectLocations), takeUntil(this.unsubscribe$))
//       .subscribe((result: any) => {
//         this.countries = result.countryList || [];
//         this.states = result.stateList || [];
//         this.cities = result.cityList || [];
//         this.selectedLocationIdDetails = result.selectedLocationIdDetails || [];
//       });
//     this.store.dispatch(
//       new ActionGetCountry({})
//     );


//   }


//   onChangeCountry(countryId) {
//     this.store.dispatch(
//       new ActionGetStateByCountryId({ countryId: countryId })
//     );
//     this.states = [];
//     this.cities = [];
//   }

//   onChangeState(stateId) {
//     this.store.dispatch(
//       new ActionGetCityByStateId({ stateId: stateId })
//     );
//     this.cities = [];
//   }

//   ngOnChanges(changes: any) {
//     if (changes["address"] && (changes["address"].previousValue !== changes["address"].currentValue)) {
//       this.address = changes["address"].currentValue || this.defAddress;
//     }
//     if (changes["locationId"] && (changes["locationId"].previousValue !== changes["locationId"].currentValue)) {
//       this.locationId = changes["locationId"].currentValue;
//       if (this.locationId) {
//         this.store.dispatch(
//           new ActionGetCountryIdStateIdByCityId({ cityId: this.locationId })
//         );
//         this.initEffects();
//       }
//     }
//   }

//   initEffects() {
//     this.updates$.pipe(
//       takeUntil(this.unsubscribe$),
//       ofType<ActionGetCountryIdStateIdByCityIdSuccess>(LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS),
//       tap(action =>
//         this.handleGetCountryIdStateIdByCityId(action)
//       )
//     ).subscribe();
//   }

//   handleGetCountryIdStateIdByCityId(action) {
//     if (action.payload && action.payload.data) {
//       const { cityId, stateId, countryId } = action.payload.data;
//       this.address.country = countryId;
//       this.address.state = stateId;
//       this.address.city = cityId;
//       this.store.dispatch(
//         new ActionGetStateByCountryId({ countryId: countryId })
//       );
//       this.store.dispatch(
//         new ActionGetCityByStateId({ stateId: stateId })
//       );
//     }
//   }

//   onChangeAddress() {
//     this.addressChange.emit(JSON.stringify(this.address));
//   }

//   saveAdress() {
//     this.addressChange.emit(JSON.stringify(this.address));
//   }

//   get value() {
//     return this.address;
//   }

//   ngOnDestroy(): void {
//     this.store.dispatch(
//       new ActionClearAddressState({  })
//     );
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }

// }

// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// import { Observable } from 'rxjs/Observable';
// import { startWith } from 'rxjs/operators/startWith';
// import { map } from 'rxjs/operators/map';

import * as data from './controls.data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  form: FormGroup;
  states = [];
  cities = [];
  countries = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  selectedLocationIdDetails: any;

  selectedCountry: any;
  selectedCity: any;
  selectedState: any;

  countryList = [];
  stateList = [];
  cityList = [];

  @Input() address: any;

  @Input() showSave = false;

  @Input() locationId: any = 1;

  isLoaded = false;

  @Output() addressChange = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public store: Store<State>,
    private updates$: Actions,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.form = this.fb.group({
      address1: ['', Validators.required],
      address2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store
      .pipe(select(selectLocations), takeUntil(this.unsubscribe$))
      .subscribe((result: any) => {
        this.countries = result.countryList || [];
        this.states = result.stateList || [];
        this.cities = result.cityList || [];
        this.selectedLocationIdDetails = result.selectedLocationIdDetails || [];
      });
    this.store.dispatch(
      new ActionGetCountry({})
    );
  }

  onChangeCountry(event) {
    const countryId = event.value;
    this.store.dispatch(
      new ActionClearAddressState({})
    );
    this.states = [];
    this.cities = [];
    setTimeout(() => {
      this.store.dispatch(
        new ActionGetStateByCountryId({ countryId: countryId })
      );
    }, 10);
  }

  onChangeState(event) {
    const stateId = event.value;
    this.store.dispatch(
      new ActionGetCityByStateId({ stateId: stateId })
    );
    this.cities = [];
  }

  get isValid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      new ActionClearAddressState({})
    );
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: any) {
    if (changes["address"] && (changes["address"].previousValue !== changes["address"].currentValue)) {
      this.address = changes["address"].currentValue;
      this.form.patchValue({
        address1: this.address.address1,
        address2: this.address.address2,
        pincode: this.address.pincode
      });
    }
    if (changes["locationId"] && (changes["locationId"].previousValue !== changes["locationId"].currentValue)) {
      this.locationId = changes["locationId"].currentValue;
      if (this.locationId) {
        this.store.dispatch(
          new ActionGetCountryIdStateIdByCityId({ cityId: this.locationId })
        );
        this.initEffects();
      }
    }
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetCountryIdStateIdByCityIdSuccess>(LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS),
      tap(action =>
        this.handleGetCountryIdStateIdByCityId(action)
      )
    ).subscribe();
  }

  handleGetCountryIdStateIdByCityId(action) {
    if (action.payload && action.payload.data) {
      const { cityId, stateId, countryId } = action.payload.data;
      this.address.country = countryId;
      this.address.state = stateId;
      this.address.city = cityId;
      this.form.patchValue({
        state:stateId,
        country:countryId,
        city: cityId
      });
      this.store.dispatch(
        new ActionGetStateByCountryId({ countryId: countryId })
      );
      this.store.dispatch(
        new ActionGetCityByStateId({ stateId: stateId })
      );
    }
  }

}
