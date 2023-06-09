export default class ToDoList {
  constructor(localStorageKey = 'tasks') {
    this.localStorageKey = localStorageKey;
    this.tasks = this.getList(this.localStorageKey);
  }

  addTask(description) {
    const index = this.tasks.length + 1;
    const newItem = { index, description, completed: false };
    this.tasks.push(newItem);
    this.saveListToLocalStorage();
    return newItem;
  }

  saveListToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  updateIndexes() {
    return this.tasks.map((task, i) => {
      task.index = i + 1;
      return task;
    });
  }

  removeTask(taskId) {
    const taskIdToRemove = parseInt(taskId, 10);
    this.tasks = this.tasks.filter((task) => task.index !== taskIdToRemove);
    this.updateIndexes();
    this.saveListToLocalStorage();
  }

  getList() {
    const items = localStorage.getItem(this.localStorageKey);
    return items ? JSON.parse(items) : [];
  }

  filterCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed !== true);
    this.updateIndexes();
    this.saveListToLocalStorage();
  }
}
