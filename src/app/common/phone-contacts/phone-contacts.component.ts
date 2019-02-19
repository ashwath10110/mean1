import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UUID } from "angular2-uuid";

@Component({
  selector: 'anms-phone-contacts',
  templateUrl: './phone-contacts.component.html',
  styleUrls: ['./phone-contacts.component.scss']
})
export class PhoneContactsComponent implements OnInit {
  isAddVisible: boolean = false;
  isAddBtnVisible: boolean = true;
  newContact: any;
  @Input() contacts: any = [
    {
      number: null,
      type: null,
      id: null
    }
  ];
  @Output() contactsChange = new EventEmitter();
  contactTypes: any = [
    {
      name: 'Mobile',
      value: 1
    },
    {
      name: 'Home',
      value: 2
    }
  ];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.contacts && changes.contacts.currentValue) {
      this.contacts = changes.contacts.currentValue || [];
    }
  }

  onClickAddContact(event: Event) {
    this.newContact = {
      number: null,
      type: null,
      id: null
    };
    this.isAddVisible = true;
    this.isAddBtnVisible = false;
  }

  onClickSaveContact(event: Event, newContact) {
    newContact = {
      ...newContact,
      id: UUID.UUID()
    }
    this.contacts = this.contacts || [];
    this.contacts = [
      ...this.contacts,
      newContact
    ];
    this.isAddVisible = false;
    this.isAddBtnVisible = true;
    this.contactsChange.emit(this.contacts);
  }

  onClickRemoveContact(event: Event, contact) {
    this.contacts = this.contacts.filter((c) => c.id != contact.id);
    this.contactsChange.emit(this.contacts);
  }

}
