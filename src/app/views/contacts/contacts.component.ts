import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from 'src/app/models/Contact';
import {UpcomingBirthdaysParams} from '../../data/dao/request/UpcomingBirthdaysParams';
import {PageEvent} from '@angular/material/paginator';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditContactDialogComponent} from '../../dialog/edit-contact-dialog/edit-contact-dialog.component';
import {DialogAction} from '../../object/DialogResult';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {FileService} from '../../services/file/file.service';

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

  @Output()
  addContact = new EventEmitter<Contact>();

  @Output()
  deleteContact = new EventEmitter<Contact>();

  @Output()
  updateContact = new EventEmitter<Contact>();

  constructor(private dialog: MatDialog,
              private fileService: FileService) {
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

  openDeleteDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить контакт: "${contact.lastName} ${contact.firstName}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.deleteContact.emit(contact);
      }
    });
  }

  openEditDialog(contact: Contact): void {

    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: [contact, 'Редактирование контакта', this.categories],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteContact.emit(contact);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateContact.emit(contact);
        return;
      }
    });
  }

  getContactPhotoUrl(contact: Contact): string {
    return !contact.photo ? 'assets/img/people.svg' : this.fileService.getUrl(contact.photo);
  }
}
