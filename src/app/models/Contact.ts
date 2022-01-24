import {Category} from './Category';

export class Contact {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  category?: Category;
  photo?: string;

  constructor(id: number,
              name: string,
              firstName: string,
              middleName: string,
              lastName: string,
              birtday: Date,
              category?: Category,
              photo?: string) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.category = category;
    this.birthday = birtday;
    this.photo = photo;
  }
}
