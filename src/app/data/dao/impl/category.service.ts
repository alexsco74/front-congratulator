import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategoryDAO} from '../interface/CategoryDAO';
import {Category} from '../../../models/Category';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements CategoryDAO {

  constructor(@Inject(CATEGORY_URL_TOKEN) private categoryUrl,
              private extendHttpClient: HttpClient) {
    super(categoryUrl, extendHttpClient);
  }

}
