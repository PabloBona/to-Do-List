// We go through the html li and for each element we add the task-id attribute and the index
// and it would look like this <li data-task-id="1">...</li>
// setAttribute Sets the value of an attribute on the indicated element, updates it if it exists
// if not created
const updateTaskElementsIndexes = () => {
  const taskElements = document.querySelectorAll('li');
  taskElements.forEach((taskElement, i) => {
    const taskIndex = i + 1;
    taskElement.setAttribute('data-task-id', taskIndex);
  });
};

export default (taskElement, List) => {
  const taskToRemove = taskElement.dataset.taskId;

  // Remove the task from the task collection (localStorage)
  List.removeTask(taskToRemove);

  // Remove the task element from the tasks list (Remove li Element)
  taskElement.remove();

  // Update the list elements to reflect the new indexes
  updateTaskElementsIndexes();
};
