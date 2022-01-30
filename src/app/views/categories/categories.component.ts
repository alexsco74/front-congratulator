import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {DialogAction} from '../../object/DialogResult';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  indexMouseMove: number;
  showEditIconCategory: boolean;
  isMobile: boolean;

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  // Добавление категории
  @Output()
  addCategory = new EventEmitter<Category>();

  // Удаление категории
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // Изменение категории
  @Output()
  updateCategory = new EventEmitter<Category>();

  // Выбор категории
  @Output()
  selectCategory = new EventEmitter<Category>();

  categories: Category[];
  selectedCategory: Category;

  constructor(private dialog: MatDialog,
              private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    // this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
  }

  getContactsByCategory(category: Category): void {
    this.selectedCategory = category;
    this.selectCategory.emit(category);
  }

  openAddDialog(): void {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [new Category(null, ''), 'Добавление категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addCategory.emit(result.obj as Category);
      }
    });
  }

  showEditIcon(show: boolean, index: number): void {
    this.indexMouseMove = index;
    this.showEditIconCategory = show;
  }

  openEditDialog(category: Category): void {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [new Category(category.id, category.name), 'Редактирование категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteCategory.emit(category);
        return;
      }

      if (result.action === DialogAction.SAVE) {

        this.updateCategory.emit(result.obj as Category);
        return;
      }
    });
  }

}
