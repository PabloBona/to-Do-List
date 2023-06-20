import List from './modules/list.js';
import './css/styles.css';
import createTaskEle from './modules/createTaskElement.js';
import removeAllCompleted from './modules/removeAll.js';

export const listTaskClass = new List();
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

clearBtn.addEventListener('click', (e) => {
  removeAllCompleted(listTaskClass, e);
});

createTaskList();

export default removeAllCompleted;
