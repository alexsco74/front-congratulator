import {Category} from '../models/Category';
import {Contact} from '../models/Contact';


export class TestData {
  static categories: Category[] = [
    {id: 1, name: 'Друзья'},
    {id: 2, name: 'Знакомые'},
    {id: 3, name: 'Сотрудники'}
  ];

  static contacts: Contact[] = [
    {
      id: 1,
      firstName: 'Имя 1',
      middleName: 'Отчество 1',
      lastName: 'Фамилия 1',
      birthday: new Date('1991-01-01'),
      category: TestData.categories[0],
      photo: null
    },
    {
      id: 2,
      firstName: 'Имя 2',
      middleName: 'Отчество 2',
      lastName: 'Фамилия 2',
      birthday: new Date('1992-02-02'),
      category: TestData.categories[1],
      photo: null
    },
    {
      id: 3,
      firstName: 'Имя 3',
      middleName: 'Отчество 3',
      lastName: 'Фамилия 3',
      birthday: new Date('1993-03-03'),
      category: TestData.categories[2],
      photo: null
    }
  ];
}
