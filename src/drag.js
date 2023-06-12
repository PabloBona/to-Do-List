// Function to handle drag events
const handleDrag = (event) => {
  // Get the task ID from the data-task-id attribute
  // eslint-disable-next-line prefer-destructuring
  const taskId = event.target.dataset.taskId;

  // Save the task ID in the dataTransfer object
  event.dataTransfer.setData('text/plain', taskId);
};

// Function to allow dropping elements
const allowDrop = (event) => {
  event.preventDefault();
};

// Function to update the task elements indexes
const updateTaskElementsIndexes = () => {
  const taskElements = document.querySelectorAll('li');
  taskElements.forEach((taskElement, i) => {
    taskElement.setAttribute('data-task-id', i + 1);
  });
};

// Function to insert task element at the desired position
const insertTaskElement = (taskElement, targetList, index) => {
  targetList.insertBefore(taskElement, targetList.children[index]);
};

// Function to handle the drop event of a dragged element
const handleDrop = (event, targetList) => {
  event.preventDefault();

  // Get the task ID from the dataTransfer object
  const taskId = event.dataTransfer.getData('text/plain');

  // Find the task element in the list
  const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`);

  // Get the index of the target element
  const targetIndex = Array.from(targetList.children).indexOf(event.target);

  // Get the current index of the dragged element
  const currentIndex = Array.from(targetList.children).indexOf(taskElement);

  // Remove the task element from the list
  targetList.removeChild(taskElement);

  // Insert the task element at the desired position
  if (currentIndex < targetIndex) {
    insertTaskElement(taskElement, targetList, targetIndex);
  } else {
    insertTaskElement(taskElement, targetList, targetIndex + 1);
  }

  // Update the task elements indexes
  updateTaskElementsIndexes();
};

// Function to handle the end of drag event
const handleDragEnd = () => {
  // Do any additional actions after the drag has completed
};

// Export the drag and drop handling functions
export {
  handleDrag,
  allowDrop,
  handleDrop,
  handleDragEnd,
  updateTaskElementsIndexes,
};
