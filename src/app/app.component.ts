import {Component, OnInit} from '@angular/core';
import {Category} from './models/Category';
import {CategoryService} from './data/dao/impl/category.service';
import {Contact} from './models/Contact';
import {ContactService} from './data/dao/impl/contact.service';
import {UpcomingBirthdaysParams} from './data/dao/request/UpcomingBirthdaysParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'congratulator';
  categories: Category[];
  contacts: Contact[];
  selectedCategories: Category = null;

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
    const upcomingBirthdaysParams = new UpcomingBirthdaysParams();
    upcomingBirthdaysParams.fromDate = (new Date()).toISOString().substring(0, 10);
    this.contactService.findUpcomingBirthdays(upcomingBirthdaysParams).subscribe(result => {
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
}
