import {Injectable} from '@angular/core';
import {Category} from '../models/Category';
import {TestData} from '../data/TestData';
import {Contact} from '../models/Contact';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // Создает объект потока
  contactsSubject = new BehaviorSubject<Contact[]>(TestData.contacts);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
  }

  fillCategories(): void {

    // Передаем категории в поток
    this.categoriesSubject.next(TestData.categories);
  }

  fillContacts(): void {

    // Передаем задачи в поток
    this.contactsSubject.next(TestData.contacts);
  }

  fillContactsByCategory(category: Category): void {

    // Передаем задачи по категории в поток
    const contacts = TestData.contacts.filter(contact => contact.category === category);
    this.contactsSubject.next(contacts);
  }
}
