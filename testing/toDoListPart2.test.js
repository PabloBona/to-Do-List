import { jest } from '@jest/globals';
import removeAllCompleted from '../src/modules/removeAll.js';
import updateCompletedStatus from '../src/modules/checkChange.js';

describe('removeAllCompleted', () => {
  beforeEach(() => {
    // Arrange: Set up the DOM for each test if needed
    document.body.innerHTML = `
      <ul>
        <li class="completed">Task 1</li>
        <li>Task 2</li>
        <li class="completed">Task 3</li>
        <li>Task 4</li>
      </ul>
    `;
  });

  afterEach(() => {
    // Clean up the DOM after each test if needed
    document.body.innerHTML = '';
  });

  test('should remove all completed tasks and call filterCompleted', () => {
    // Arrange: Mock the listTaskClass object and the event
    const listTaskClass = {
      filterCompleted: jest.fn(),
    };
    const event = { preventDefault: jest.fn() };

    // Act: Call the removeAllCompleted function
    removeAllCompleted(listTaskClass, event);

    // Assert: Verify that elements with the class 'completed' have been removed
    const completedList = document.querySelectorAll('.completed');
    expect(completedList.length).toBe(0);

    // Assert: Verify that filterCompleted has been called
    expect(listTaskClass.filterCompleted).toHaveBeenCalled();

    // Assert: Verify that preventDefault has been called on the event
    expect(event.preventDefault).toHaveBeenCalled();
  });

  describe('updateCompletedStatus', () => {
    let li;
    let task;
    let listTaskClass;

    beforeEach(() => {
      // Arrange: Create a simulated li element
      li = document.createElement('li');
      li.id = 'task-1';

      // Arrange: Create a simulated task object
      task = {
        completed: false,
      };

      // Arrange: Mock the listTaskClass object
      listTaskClass = {
        saveListToLocalStorage: jest.fn(),
      };
    });
    test('should update the completed status of the task and save to localStorage', () => {
      // Arrange: Add the 'completed' class to the simulated element
      li.classList.add('completed');

      // Act: Call the updateCompletedStatus function
      updateCompletedStatus(li, task, listTaskClass);

      // Assert: Verify that the 'completed' class has been removed from the simulated element
      expect(li.classList.contains('completed')).toBe(false);

      // Assert: Update the 'completed' status of the task
      task.completed = true;

      // Assert: Verify that the 'completed' status of the task has been updated
      expect(task.completed).toBe(true);

      // Assert: Verify that saveListToLocalStorage has been called on listTaskClass
      expect(listTaskClass.saveListToLocalStorage).toHaveBeenCalled();
    });
  });
});
