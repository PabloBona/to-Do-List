import { jest } from '@jest/globals';
import List from '../src/modules/list.js';
import createTaskEle from '../src/modules/createTaskElement.js';
import removeTask from '../src/modules/removeTask.js';

afterEach(() => {
  localStorage.clear();
});

describe('listClass', () => {
  test('To allow create a new instance', () => {
    // arrange
    const listClass = new List();

    // Act
    const { tasks } = listClass;

    // Assert
    expect(tasks).toHaveLength(0);
  });

  test('To allow add a new task', () => {
    // arrange
    const listClass = new List();
    const newTask = listClass.addTask('New task');
    // Act
    const { tasks } = listClass;

    // Assert
    expect(tasks).toHaveLength(1);
    expect(tasks).toContain(newTask);
  });
});

describe('createTaskEle', () => {
  test('should create an <li> element with the correct properties', () => {
    // Arrange
    const task = {
      index: 1,
      description: 'This is a task',
      completed: false,
    };
    const listTaskClass = {
      saveListToLocalStorage: jest.fn(),
    };
    const taskListContainer = document.createElement('ul');

    // Act
    const li = createTaskEle(task, listTaskClass, taskListContainer);

    // Assert
    expect(li.tagName).toBe('LI');
    expect(li.getAttribute('data-task-id')).toBe('1');
    expect(li.draggable).toBe(true);
    expect(li.classList.contains('lilist')).toBe(true);

    const checkbox = li.querySelector('input');
    expect(checkbox).toBeTruthy();
    expect(checkbox.type).toBe('checkbox');
    expect(checkbox.checked).toBe(false);

    const p = li.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.contentEditable).toBe(true);
    expect(p.classList.contains('editable')).toBe(true);
    expect(p.textContent).toBe('This is a task');

    const removeButton = li.querySelector('button');
    expect(removeButton).toBeTruthy();
    expect(removeButton.innerHTML).toBe('<i class="bx bx-trash"></i>');
  });

  describe('removeTask', () => {
    test('should remove a task from the list', () => {
      // Arrange
      const listClass = new List();
      const task1 = listClass.addTask('Task 1');

      // Act
      listClass.removeTask(task1.index);

      // Assert
      expect(listClass.tasks.some((task) => task.description === 'Task 1')).toBe(false);
    });
  });

  describe('removeTask hmtl li', () => {
    test('should remove a task from the html', () => {
      // Arrange
      const listClass = new List();
      const task1 = listClass.addTask('Task 1');
      const taskListContainer = document.createElement('ul');
      const li = createTaskEle(task1, listClass, taskListContainer);

      // Act
      removeTask(li, listClass);

      // Assert
      expect(listClass.tasks.some((task) => task.description === 'Task 1')).toBe(false);
      expect(taskListContainer.querySelector('li')).toBeNull();
    });
  });
});
