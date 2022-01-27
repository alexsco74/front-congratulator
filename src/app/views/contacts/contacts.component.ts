import {Component, Input, OnInit} from '@angular/core';
import {Contact} from 'src/app/models/Contact';
import {Category} from '../../models/Category';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  @Input('contacts')
  set setContacts(contacts: Contact[]) {
    this.contacts = contacts;
  }

  constructor() {
  }

  ngOnInit(): void {
    // this.dataHandler.contactsSubject.subscribe(contacts => this.contacts = contacts);
  }

  getPropertyEntityName(propertyName: string, contact: Contact): string {
    return contact[propertyName] ? contact[propertyName].name : 'Не используется';
  }

  isEmptyProperty(propertyName, contact: Contact): boolean {
    return !contact[propertyName];
  }
}
