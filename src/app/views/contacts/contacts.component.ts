import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from 'src/app/models/Contact';
import {UpcomingBirthdaysParams} from '../../data/dao/request/UpcomingBirthdaysParams';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  upcomingBirthdaysParams: UpcomingBirthdaysParams;

  @Input('contacts')
  set setContacts(contacts: Contact[]) {
    this.contacts = contacts;
  }

  @Input('upcomingBirthdaysParams')
  set setUpcomingBirthdaysParams(upcomingBirthdaysParams: UpcomingBirthdaysParams) {
    this.upcomingBirthdaysParams = upcomingBirthdaysParams;
  }

  @Input()
  contactsPageCount: number;

  @Output()
  paging = new EventEmitter<PageEvent>();
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

  pageChanged(pageEvent: PageEvent): void {
    this.paging.emit(pageEvent);
  }
}
