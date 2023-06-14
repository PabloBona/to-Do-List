import List from '../src/modules/list.js';

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

  // test('To allow add a new task', () => {
  //   // arrange
  //   const listClass = new List();
  //   const newTask = listClass.addTask('New task');
  //   // Act
  //   const { tasks } = listClass;

  //   // Assert
  //   expect(tasks).toContain(newTask);
  // });
});