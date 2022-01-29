export class DialogResult {
  action: DialogAction;
  obj: any;

  // ? означает необязательный параметр
  constructor(action: DialogAction, obj?: any) {
    this.action = action;
    this.obj = obj;
  }
}

// Действия в диалоге
export enum DialogAction {
  SAVE, // сохранение изменений
  OK, // подтверждение действий
  CANCEL, // отмена действия
  DELETE, // удаление объекта
}
