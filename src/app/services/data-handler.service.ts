import {Injectable} from '@angular/core';
import {Category} from "../models/Category";
import {TestData} from "../data/TestData";
import {Task} from '../models/Task';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // Сохдает объект потока
  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
  }

  fillCategories() {

    // Передаем категории в поток
    this.categoriesSubject.next(TestData.categories);
  }

  fillTasks(): void {

    // Передаем задачи в поток
    this.tasksSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category): void {

    // Передаем задачи по категории в поток
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.tasksSubject.next(tasks);
  }
}
