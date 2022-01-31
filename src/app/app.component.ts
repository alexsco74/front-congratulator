import {Component, OnInit} from '@angular/core';
import {Category} from './models/Category';
import {CategoryService} from './data/dao/impl/category.service';
import {Contact} from './models/Contact';
import {ContactService} from './data/dao/impl/contact.service';
import {UpcomingBirthdaysParams} from './data/dao/request/UpcomingBirthdaysParams';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'congratulator';
  categories: Category[];
  contacts: Contact[];
  selectedCategory: Category = null;
  upcomingBirthdaysParams = new UpcomingBirthdaysParams();
  contactsPageCount: number;

  constructor(private categoryService: CategoryService,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.fillAllCategories();
    this.fillAllContacts();
  }

  // Заполнить категории
  fillAllCategories(): void {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
    });
  }

  // Заполнить контакты
  fillAllContacts(): void {
    this.upcomingBirthdaysParams.fromDate = (new Date()).toISOString().substring(0, 10);

    this.contactService.findUpcomingBirthdays(this.upcomingBirthdaysParams).subscribe(result => {
      this.contactsPageCount = result.totalElements;
      this.contacts = result.content;
    });
  }

  // Добавить категорию
  addCategory(category: Category): void {
    this.categoryService.add(category).subscribe(
      (result) => {
        this.fillAllCategories();
      }
    );
  }

  // Удалить категорию
  deleteCategory(category: Category): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.fillAllCategories();
    });
  }

  // Изменить категорию
  updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(() => {
      this.fillAllCategories();
    });
  }

  // Выбрать категорию
  selectCategory(category: Category): void {
    this.upcomingBirthdaysParams.pageIndex = 0;
    this.selectedCategory = category;
    this.upcomingBirthdaysParams.categoryId = this.selectedCategory ? this.selectedCategory.id : null;
    this.fillAllContacts();
  }

  initPageParams(pageEvent: PageEvent): void {

    if (this.upcomingBirthdaysParams.pageSize !== pageEvent.pageSize) {
      this.upcomingBirthdaysParams.pageIndex = 0;
    } else {
      this.upcomingBirthdaysParams.pageIndex = pageEvent.pageIndex;
    }

    this.upcomingBirthdaysParams.pageSize = pageEvent.pageSize;

    this.fillAllContacts();
  }

  // Добавить контакт
  addContact(contact: Contact): void {
    this.contactService.add(contact).subscribe(result => {
      this.fillAllContacts();
    });
  }

  // Удалить контакт
  deleteContact(contact: Contact): void {

    this.contactService.delete(contact.id).subscribe(() => {
      this.fillAllContacts();
    });
  }

  // Обновить контакт
  updateContact(contact: Contact): void {
    this.contactService.update(contact).subscribe(() => {
      this.fillAllContacts();
    });
  }
}
