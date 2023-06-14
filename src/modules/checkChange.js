export default (li, task, listTaskClass) => {
  const isCompleted = task.completed;
  li.classList.toggle('completed', isCompleted);
  listTaskClass.saveListToLocalStorage();
};
