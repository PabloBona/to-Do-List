const removeAllCompleted = (listTaskClass, e) => {
  e.preventDefault();
  const completedList = document.querySelectorAll('.completed');

  completedList.forEach((li) => {
    li.remove();
  });
  listTaskClass.filterCompleted();
};

export default removeAllCompleted;
