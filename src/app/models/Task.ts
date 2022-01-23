import {Priority} from "./Priority";
import {Category} from "./Category";

export class Task {
  id: number;
  title: string;
  isComplete: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;

  constructor(id: number, title: string, isComplete: boolean, priority?: Priority, category?: Category, date?: Date) {
    this.id = id;
    this.title = title;
    this.isComplete = isComplete;
    this.priority = priority;
    this.category = category;
    this.date = date;
  }
}
