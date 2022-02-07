import {Component, Inject, OnInit} from '@angular/core';
import {Contact} from '../../models/Contact';
import {Category} from '../../models/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ContactService} from '../../data/dao/impl/contact.service';
import {FileService} from '../../services/file/file.service';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {
  // @ViewChild('fileInput') fileInput: ElementRef;

  isDropOver: boolean;

  constructor(
    private dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Contact, string, Category[]],
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private contactService: ContactService,
    private fileService: FileService
  ) {
    const headers = [{
      name: 'Accept',
      value: 'application/json'
    }];
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

  newPhoto: string;
  newPhotoSrc: string;

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

    this.newPhoto = this.contact.photo;
    this.newPhotoSrc = this.fileService.getUrl(this.contact.photo);

  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  // onClickFile(): void {
  //   this.fileInput.nativeElement.click();
  // }

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
    this.contact.photo = this.newPhoto;
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

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.contactService.uploadFile(formData).subscribe((result) => {
        this.newPhoto = result.path;
        this.newPhotoSrc = this.fileService.getUrl(result.path);
      });
    }
  }

}
