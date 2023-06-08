import List from './list.js';
import './styles.css';
import removeTask from './removeTask.js';
import handleCheckboxChange from './checkChange.js';

const listTaskClass = new List();
const listTask = listTaskClass.tasks;
const taskInput = document.querySelector('#task-description');
const taskListContainer = document.querySelector('#show-task');
const addTaskForm = document.querySelector('#task-form');

const createTaskEle = (task) => {
  const { index, description, completed } = task;
  const li = document.createElement('li');
  li.setAttribute('data-task-id', index);

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
      task.description = p.textContent;
      listTaskClass.saveListToLocalStorage();
      p.blur();
    }
  });

  handleCheckboxChange(
    checkbox,
    task,
    // eslint-disable-next-line comma-dangle
    listTaskClass.saveListToLocalStorage.bind(listTaskClass)
  );

  removeButton.addEventListener('click', () => {
    removeTask(li, listTaskClass);
  });
};

const createTaskList = () => {
  listTask.forEach((task) => {
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

createTaskList(listTask);
