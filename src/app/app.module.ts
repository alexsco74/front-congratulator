import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {ContactsComponent} from './views/contacts/contacts.component';
import {HttpClientModule} from '@angular/common/http';
import {CATEGORY_URL_TOKEN} from './data/dao/impl/category.service';
import {CONTACT_URL_TOKEN} from './data/dao/impl/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
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
