import {Component, Inject, OnInit} from '@angular/core';
import {Contact} from '../../models/Contact';
import {Category} from '../../models/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Contact, string, Category[]],
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ) {
  }

  // коллекции получаем из главной страницы (через параметры диалог. окна), чтобы здесь заново не делать запрос в БД
  categories: Category[];

  // мобильное ли устройство
  isMobile = this.deviceService.isMobile();

  dialogTitle: string;
  contact: Contact;

  newLastName: string;
  newFirstName: string;
  newMiddleName: string;

  newCategoryId: number;
  newBirthday: Date;

  // старый id категории тоже сохраняем, чтобы иметь возможность знать,
  // какая была до этого категория (нужно для правильного обновления счетчиков)
  oldCategoryId: number;


  canDelete = false;


  ngOnInit(): void {
    this.contact = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];

    if (this.contact && this.contact.id > 0) {
      this.canDelete = true;
    }

    this.newLastName = this.contact.lastName;
    this.newFirstName = this.contact.firstName;
    this.newMiddleName = this.contact.middleName;

    if (this.contact.category) {
      this.newCategoryId = this.contact.category.id;
      this.oldCategoryId = this.contact.category.id;
    }

    if (this.contact.birthday) {
      this.newBirthday = new Date(this.contact.birthday);
    }


  }

  // нажали ОК
  confirm(): void {

    this.contact.lastName = this.newLastName;
    this.contact.firstName = this.newFirstName;
    this.contact.middleName = this.newMiddleName;
    this.contact.category = this.findCategoryById(this.newCategoryId);

    if (!this.newBirthday) {
      this.contact.birthday = null;
    } else {
      // в поле дата хранится в текущей timezone, в БД дата автоматически сохранится в формате UTC
      this.contact.birthday = this.newBirthday;
    }
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.contact));

  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  // нажали Удалить
  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить контакт: "${this.contact.lastName} {this.contact.firstName}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  // поиск категории по id
  private findCategoryById(tmpCategoryId: number): Category {
    return this.categories.find(t => t.id === tmpCategoryId);
  }

}
