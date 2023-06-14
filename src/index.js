import List from './modules/list.js';
import './css/styles.css';
import createTaskEle from './modules/createTaskElement.js';

const listTaskClass = new List();
const clearBtn = document.querySelector('#clear-btn');
const taskInput = document.querySelector('#task-description');
const taskListContainer = document.querySelector('#show-task');
const addTaskForm = document.querySelector('#task-form');

const createTaskList = () => {
  listTaskClass.tasks.forEach((task) => {
    const p = createTaskEle(task, listTaskClass, taskListContainer);
    p.addEventListener('blur', () => {
      task.description = p.textContent;
      listTaskClass.saveListToLocalStorage();
    });
  });
};

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cleanValue = taskInput.value.trim();
  if (cleanValue) {
    const newTask = listTaskClass.addTask(taskInput.value);
    addTaskForm.reset();
    createTaskEle(newTask, listTaskClass, taskListContainer);
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