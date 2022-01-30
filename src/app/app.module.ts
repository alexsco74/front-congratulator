import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {ContactsComponent} from './views/contacts/contacts.component';
import {HttpClientModule} from '@angular/common/http';
import {CATEGORY_URL_TOKEN} from './data/dao/impl/category.service';
import {CONTACT_URL_TOKEN} from './data/dao/impl/contact.service';
import {MatIconModule} from '@angular/material/icon';
import {EditCategoryDialogComponent} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditContactDialogComponent } from './dialog/edit-contact-dialog/edit-contact-dialog.component';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ContactsComponent,
    EditCategoryDialogComponent,
    ConfirmDialogComponent,
    EditContactDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'http://localhost:8080/category'
    },
    {
      provide: CONTACT_URL_TOKEN,
      useValue: 'http://localhost:8080/contact'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
