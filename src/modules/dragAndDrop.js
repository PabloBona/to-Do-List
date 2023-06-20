// Define the drag event start
export const dragStart = (e) => {
  // Add a classlist
  e.currentTarget.classList.add('dragging');
  // Set the data type and assign a taskId to transfer
  // (The data that is transferred during a drag and drop interaction.)
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.taskId);
};

// Define the drag event end

export const dragEnd = (e) => {
  // Remove the classlist
  e.currentTarget.classList.remove('dragging');
};

// represent the drag event over a valid drop target
export const allowDrop = (e) => {
  e.preventDefault();
};

// represent the event drop in a valid drop target
// (when an element or text selection is dropped on a valid drop target.)
export const handleDrop = (listTaskClass, e) => {
  e.preventDefault();

  // Get the ID of the dragged task
  const draggedTaskId = e.dataTransfer.getData('text/plain');

  // Get the dragged task
  const draggedTask = document.querySelector(
    `li[data-task-id="${draggedTaskId}"]`,
  );

  // Get the drop zone
  const dropZone = e.currentTarget;

  // Check if the dropped element is a valid drop target
  if (dropZone !== draggedTask) {
    // Reorder the tasks in the list
    const taskList = Array.from(document.querySelectorAll('#show-task li'));
    const indexDragged = taskList.indexOf(draggedTask);
    const indexDropZone = taskList.indexOf(dropZone);

    if (indexDragged > indexDropZone) {
      dropZone.parentNode.insertBefore(draggedTask, dropZone);
    } else {
      dropZone.parentNode.insertBefore(draggedTask, dropZone.nextSibling);
    }
    // Update the order of the tasks in the list
    // eslint-disable-next-line prefer-destructuring
    const tasks = listTaskClass.tasks;
    const draggedTaskObj = tasks.find(
      (task) => task.index === parseInt(draggedTaskId, 10),
    );
    tasks.splice(indexDragged, 1);
    tasks.splice(indexDropZone, 0, draggedTaskObj);
    listTaskClass.saveListToLocalStorage();
  }
};

export const enableDragAndDrop = (li, listTaskClass) => {
  li.addEventListener('dragstart', dragStart);
  li.addEventListener('dragend', dragEnd);
  li.addEventListener('dragover', allowDrop);
  li.addEventListener('drop', handleDrop.bind(null, listTaskClass));
  li.setAttribute('draggable', 'true');
};
