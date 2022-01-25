import {CommonDAO} from './CommonDAO';
import {Contact} from '../../../models/Contact';
import {Observable} from 'rxjs';
import {ContactSearchParams} from '../search/ContactSearchParams';
import {UpcomingBirthdaysParams} from '../request/UpcomingBirthdaysParams';

export interface ContactDAO extends CommonDAO<Contact> {

  // Найти контакты по параметрам
  findContacts(contactSearchParams: ContactSearchParams): Observable<any>;

  // Найти ближайшие дни рождения
  findUpcomingBirthdays(upcomingBirthdaysParams: UpcomingBirthdaysParams): Observable<any>;
}
