import removeTask from './removeTask.js';
import handleCheckboxChange from './checkChange.js';
import { enableDragAndDrop } from './dragAndDrop.js';

export default function createTaskEle(task, listTaskClass, taskListContainer) {
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

  // Habilitar el drag and drop
  enableDragAndDrop(li, listTaskClass);
  return li;
}