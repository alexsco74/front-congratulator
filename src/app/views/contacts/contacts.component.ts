import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from 'src/app/models/Contact';
import {UpcomingBirthdaysParams} from '../../data/dao/request/UpcomingBirthdaysParams';
import {PageEvent} from '@angular/material/paginator';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditContactDialogComponent} from '../../dialog/edit-contact-dialog/edit-contact-dialog.component';
import {DialogAction} from '../../object/DialogResult';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  categories: Category[];
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

  @Input()
  selectedCategory: Category;

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Output()
  paging = new EventEmitter<PageEvent>();
  constructor(private dialog: MatDialog) {
  }

  @Output()
  addContact = new EventEmitter<Contact>();

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

  openAddDialog(): void {
    const contact = new Contact(null, '', '', '', '', null, this.selectedCategory);
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: [contact, 'Добавление контакта', this.categories],
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addContact.emit(contact);
      }
    });

  }
}
