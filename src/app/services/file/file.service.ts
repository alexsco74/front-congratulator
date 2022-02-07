import {Injectable} from '@angular/core';
import * as config from '../../config';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  getUrl(path: string): string {
    return path ? config.BACK_PROTOCOL + '://' + config.BACK_HOST + '/' + config.BACK_PUBLIC_FILES_URI + '/' + path : '';
  }
}
