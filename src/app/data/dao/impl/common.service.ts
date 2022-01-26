import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class CommonService<T> {
  private readonly url: string;

  constructor(url: string,
              private httpClient: HttpClient) {
    this.url = url;
  }

  // Получить все объекты
  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  // Получить объект
  get(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  // Обновить объект
  update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update', t);
  }

  // Удалить объект
  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/' + id);
  }

  // Добавить объект
  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }
}
