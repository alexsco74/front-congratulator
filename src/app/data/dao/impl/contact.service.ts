import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../../../models/Contact';
import {ContactSearchParams} from '../search/ContactSearchParams';
import {UpcomingBirthdaysParams} from '../request/UpcomingBirthdaysParams';
import {CommonService} from './common.service';
import {ContactDAO} from '../interface/ContactDAO';

export const CONTACT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class ContactService extends CommonService<Contact> implements ContactDAO {

  constructor(@Inject(CONTACT_URL_TOKEN) private contactUrl,
              private contactHttpClient: HttpClient) {
    super(contactUrl, contactHttpClient);
  }

  // Найти контакты по параметрам
  findContacts(contactSearchParams: ContactSearchParams): Observable<Contact[]> {
    return this.contactHttpClient.post<Contact[]>(this.contactUrl + '/search', contactSearchParams);
  }

  // Найти ближайшие дни рождения
  findUpcomingBirthdays(upcomingBirthdaysParams: UpcomingBirthdaysParams): Observable<any> {
    return this.contactHttpClient.post<any>(this.contactUrl + '/upcoming-birthdays', upcomingBirthdaysParams);
  }

  // Загрузить файл на сервер
  uploadFile(formData: any): Observable<any> {
    return this.contactHttpClient.post<any>(this.contactUrl + '/api/files', formData);
  }

}
