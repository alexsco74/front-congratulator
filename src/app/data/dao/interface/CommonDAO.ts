// Create Read Update Delete
import {Observable} from 'rxjs';

export interface CommonDAO<T> {

  // Получить все объекты
  getAll(): Observable<T[]>;

  // Получить объект
  get(id: number): Observable<T>;

  // Обновить объект
  update(obj: T): Observable<T>;

  // Добавить объект
  add(obj: T): Observable<T>;
}
