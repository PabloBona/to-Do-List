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
  });
});
