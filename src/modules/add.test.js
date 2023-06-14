import List from './list.js';

describe('listClass', () => {
  test('To allow create a new instance', () => {
    // arrange
    const listClass = new List();

    // Act
    const { tasks } = listClass;

    // Assert
    expect(tasks).toHaveLength(0);
  });
});