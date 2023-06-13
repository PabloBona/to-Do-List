import List from './list.js';
import './styles.css';
import removeTask from './removeTask.js';
import handleCheckboxChange from './checkChange.js';

const listTaskClass = new List();
const clearBtn = document.querySelector('#clear-btn');
const taskInput = document.querySelector('#task-description');
const taskListContainer = document.querySelector('#show-task');
const addTaskForm = document.querySelector('#task-form');

const createTaskEle = (task) => {
  const { index, description, completed } = task;
  const li = document.createElement('li');
  li.setAttribute('data-task-id', index);
  li.draggable = true;
  li.classList.add('lilist');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const p = document.createElement('p');
  p.contentEditable = true;
  p.classList.add('editable');
  p.textContent = description;

  const removeButton = document.createElement('button');
  removeButton.innerHTML = '<i class="bx bx-trash"></i>';

  const div = document.createElement('div');
  div.classList.add('text-input');
  div.appendChild(checkbox);
  div.appendChild(p);

  li.appendChild(div);
  li.appendChild(removeButton);

  if (completed) {
    li.classList.add('completed');
  }

  taskListContainer.appendChild(li);

  p.addEventListener('keypress', (e) => {
    if (e.key.includes('Enter')) {
      p.blur();
    }
  });

  p.addEventListener('blur', () => {
    task.description = p.textContent;
    listTaskClass.saveListToLocalStorage();
  });

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    handleCheckboxChange(li, task, listTaskClass);
  });

  removeButton.addEventListener('click', () => {
    removeTask(li, listTaskClass);
  });
};

const createTaskList = () => {
  listTaskClass.tasks.forEach((task) => {
    createTaskEle(task);
  });
};

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cleanValue = taskInput.value.trim();
  if (cleanValue) {
    const newTask = listTaskClass.addTask(taskInput.value);
    addTaskForm.reset();
    createTaskEle(newTask);
  }
});

const removeAllCompleted = (e) => {
  e.preventDefault();
  const completedList = document.querySelectorAll('.completed');

  completedList.forEach((li) => {
    li.remove();
  });
  listTaskClass.filterCompleted();
};

clearBtn.addEventListener('click', removeAllCompleted);

createTaskList();

// Define the drag event start
const dragStart = (e) => {
  // Add a classlist
  e.currentTarget.classList.add('dragging');

  // Set the data type and assign a taskId to transfer
  // (The data that is transferred during a drag and drop interaction.)
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.taskId);
};

// Define the drag event end
const dragEnd = (e) => {
  // Remove the classlist
  e.currentTarget.classList.remove('dragging');
};

// represent the drag event over a valid drop target
const allowDrop = (e) => {
  e.preventDefault();
};

// represent the event drop in a valid drop target
// (when an element or text selection is dropped on a valid drop target.)
const handleDrop = (e) => {
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
    const taskList = Array.from(taskListContainer.querySelectorAll('li'));
    const indexDragged = taskList.indexOf(draggedTask);
    const indexDropZone = taskList.indexOf(dropZone);

    if (indexDragged > indexDropZone) {
      taskListContainer.insertBefore(draggedTask, dropZone);
    } else {
      taskListContainer.insertBefore(draggedTask, dropZone.nextSibling);
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

const enableDragAndDrop = () => {
  const dragLis = document.querySelectorAll('.lilist');
  dragLis.forEach((dragLi) => {
    dragLi.addEventListener('dragstart', dragStart);
    dragLi.addEventListener('dragend', dragEnd);
    dragLi.addEventListener('dragover', allowDrop);
    dragLi.addEventListener('drop', handleDrop);
    dragLi.setAttribute('draggable', 'true');
  });
};

enableDragAndDrop();
