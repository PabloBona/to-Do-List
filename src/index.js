import List from './list.js';
import './styles.css';

const listTaskClass = new List();
const listTask = listTaskClass.list;

const taskInput = document.querySelector('#task-description');
const taskListContainer = document.querySelector('#show-task');
const addTaskForm = document.querySelector('#task-form');

const createTaskEle = (task) => {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const dragButton = document.createElement('button');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  dragButton.innerHTML = "<i class='bx bx-dots-vertical-rounded'></i>";
  const description = document.createElement('p');
  description.textContent = task.description;

  listItem.appendChild(checkbox);
  listItem.appendChild(description);
  listItem.appendChild(dragButton);
  taskListContainer.appendChild(listItem);
};
// --------------------------------------------------

// busco el ul contenedor de la lista que se va a mostrat y hago un foreach,
// por cada objeto del array creo li, inputs y le agrego el type checkbox
// creo un li por cada elemento
// le asigno al checked el true si esta completo
// creo un elemento p y le agrego el value del task.description
const createTaskList = (listTask) => {
  listTask.forEach((task) => {
    createTaskEle(task);
  });
  // --------------------------------------------------

  // --------------------------------------------------
};
// --------------------------------------------------
// Creo un selector de form, agrego un evento y al input le extraigo el value, despues lo pusheo
// al array y llamo a la funcion de salvado en el local storage

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = listTaskClass.addToList(taskInput.value);

  addTaskForm.reset();
  createTaskEle(newTask);
});

createTaskList(listTask);
