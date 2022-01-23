import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/models/Task';
import {DataHandlerService} from "../../services/data-handler.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);
  }

  getPropertyEntityTitle(propertyName: string, task: Task) {
    return task[propertyName] ? task[propertyName].title : 'Не используется';
  }

  //
  // getDate(task: Task){
  //   return task.date ? this.datePipe.transform(task.date, 'short') : "Нет даты";
  // }
  toggleTaskCompleted(task: Task) {
    task.isComplete = !task.isComplete;
  }

  isEmptyProperty(propertyName, task: Task) {
    return !task[propertyName];
  }
}
