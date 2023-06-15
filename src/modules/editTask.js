function editTaskDescription(taskId, newDescription, listTaskClass) {
  // Get the task from the list.
  const task = listTaskClass.tasks.find((task) => task.id === taskId);

  // If the task exists, update its description.
  if (task) {
    task.description = newDescription;
    listTaskClass.saveListToLocalStorage();
  }
}

export default editTaskDescription;
