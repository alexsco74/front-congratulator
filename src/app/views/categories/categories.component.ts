import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;

  constructor() {
  }

  ngOnInit(): void {
    // this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
  }

  getContactsByCategory(category: Category): void {
    this.selectedCategory = category;
    // this.dataHandler.fillContactsByCategory(category);
  }

}
