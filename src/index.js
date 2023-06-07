import './styles.css';

const listTask = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete To Do list proyect', completed: false, index: 2 },
];

const taskListContainer = document.querySelector('#show-task');

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

const createTaskList = (listTask) => {
  listTask.forEach((task) => {
    createTaskEle(task);
  });
};

createTaskList(listTask);
