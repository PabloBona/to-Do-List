export default class List {
  constructor(localStorageKey = 'tasks') {
    this.localStorageKey = localStorageKey;
    this.list = this.getList(this.localStorageKey);
  }

  addToList(description) {
    const index = this.list.length + 1;
    const newItem = { index, description, completed: false };
    this.list.push(newItem);
    this.saveListToLocalStorage();

    return newItem;
  }

  saveListToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.list));
  }

  getList() {
    const items = localStorage.getItem(this.localStorageKey);
    return items ? JSON.parse(items) : [];
  }

  updateIndexes() {
    this.list.forEach((task, index) => {
      task.index = index + 1;
    });
  }
}
