import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UUID } from "angular2-uuid";

@Component({
    selector: 'anms-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
  })

  export class ContactDetailsComponent implements OnInit {

    isAddVisible: boolean = false;
    isAddBtnVisible: boolean = true;
    newContact: any;
    @Input() contacts: any = [
        {
          phone: null, 
          fullName: null,
          email: null,
          remarks: null
        }
      ]; 

      @Output() contactsChange = new EventEmitter();
      @Output() removeContact = new EventEmitter();
      constructor() { }
      ngOnInit(){}

      onClickAddContact(event: Event) {
        this.newContact = {
            phone: null,
            fullName: null,
            remarks: null,
            email: null
        };
        this.isAddVisible = true;
        this.isAddBtnVisible = false;
      }

      populateSelectedContact(contact){
        if(contact && contact.id){
          this.newContact = contact;
          this.isAddVisible = true;
          this.isAddBtnVisible = false;
        }
      }

      onClickSaveContact(event: Event, newContact) {
        newContact = {
          ...newContact,
          uid: UUID.UUID()
        }
        
        this.isAddVisible = false;
        this.isAddBtnVisible = true;
        this.contactsChange.emit({
          name: 'update-contact-details',
          value: newContact
        });
      }

      onClickUndoEntry(event: Event){
        this.isAddVisible = false; 
        this.isAddBtnVisible = true;
        this.contactsChange.emit({
          name: 'get-contact-details'
        });
      }

      onDeleteContact(event: Event, contact){
        const contactToBeDeleted =  contact;
        this.removeContact.emit({
          name: 'remove-contact-detail',
          value: contact
        })

      }
  }