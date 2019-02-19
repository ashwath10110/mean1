import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UUID } from "angular2-uuid";
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState, selectAuthState } from '@app/core';
import { State } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';
import { takeUntil, tap, take } from 'rxjs/operators';


@Component({
    selector: 'anms-partner-contact-details',
    templateUrl: './partner-contact-details.component.html',
    styleUrls: ['./partner-contact-details.component.scss']
  })

  export class PartnerContactDetailsComponent implements OnInit {

    private unsubscribe$: Subject<void> = new Subject<void>();
    isAddVisible: boolean = false;
    isAddBtnVisible: boolean = true;
    newContact: any;
    backupContact: any;
    isDisabled: boolean = false;
    roles = [];


    partnerContactPersonFormGroup: FormGroup;

    @Input() contacts: any = [
        {
          phone: null,
          firstName: null,
          lastName: null,
          email: null,
          username: null
        }
      ]; 

       @Output() contactsChange = new EventEmitter();
       @Output() removeContact = new EventEmitter();

    constructor(
      private _formBuilder: FormBuilder,
      public store: Store<State>
    ) { }
    ngOnInit(){
      if(!this.contacts){
  
      }
      this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
        .subscribe((state: any) => {
        if(state.user.data.roles)
        this.roles.push(state.user.data.roles);
      });
    }

    onClickAddContact(event: Event) {
      this.isDisabled = false;
      this.newContact = {
          phone: null,
          firstName: null,
          email: null,
          lastName: null,
          username:null
      };
      this.popuplateContactPersonFormData({});
      this.isAddVisible = true;
      this.isAddBtnVisible = false;
    }

    populateSelectedContact(contact){
      this.isDisabled = true;
      if(contact && contact.id){
        this.backupContact  = contact;
        this.newContact = contact;
        this.isAddVisible = true;
        this.isAddBtnVisible = false;
        this.popuplateContactPersonFormData(contact);
      }

    }

    popuplateContactPersonFormData(contact){
      const phoneRegEx = '^[0-9]{10}$';
      const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
        const phone = contact.phone || '';
        const firstName = contact.firstName || '';
        const lastName = contact.lastName || '';
        const username = contact.username|| '';
        const email = contact.email || '';

        this.partnerContactPersonFormGroup = this._formBuilder.group({
          phone: [phone, [Validators.pattern(phoneRegEx), Validators.required]],
          firstName: [firstName, Validators.required],
          lastName: [lastName, Validators.required],
          email: [email, [Validators.required, Validators.pattern(emailRegEx)]],
          username: [{value:username, disabled: this.isDisabled}, [Validators.required]],
        });
    } 

    onClickSaveContact(form, newContact){
       newContact = {
        ...newContact,
        ... form.value,
      }
      
      this.isAddVisible = false;
      this.isAddBtnVisible = true;
      this.contactsChange.emit({
        name: 'update-contact-details',
        value: newContact
      });
    }

    onCanelContact(){
      this.newContact = this.backupContact;
      this.isDisabled = false;
    }

    onDeleteContact(contact){
      const contactToBeDeleted =  contact;
      this.removeContact.emit({
        name: 'remove-contact-detail',
        value: contact
      })

    }

     // DESTROY
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

   }