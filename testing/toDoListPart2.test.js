import { jest } from '@jest/globals';
import removeAllCompleted from '../src/modules/removeAll.js';

describe('removeAllCompleted', () => {
  beforeEach(() => {
    // Set up the DOM for each test if needed
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
    // Mock the listTaskClass object and the event
    const listTaskClass = {
      filterCompleted: jest.fn(),
    };
    const event = { preventDefault: jest.fn() };

    // Call the removeAllCompleted function
    removeAllCompleted(listTaskClass, event);

    // Verify that elements with the class 'completed' have been removed
    const completedList = document.querySelectorAll('.completed');
    expect(completedList.length).toBe(0);

    // Verify that filterCompleted has been called
    expect(listTaskClass.filterCompleted).toHaveBeenCalled();

    // Verify that preventDefault has been called on the event
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
