export default (checkbox, task, saveListToLocalStorage) => {
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveListToLocalStorage();
  });
};
