export const getDummyNotes = (count) => {
  const dummyNotes = [];
  for (let i = 1; i <= count; i++) {
    dummyNotes.push({
      id: `dummyNote_${i}`,
      author: 'Author name',
      title: `Note #${i}`,
      content: `Content of note #${i}`,
      date: new Date().toLocaleDateString(),
    });
  }
  return dummyNotes;
};

export const getDummyTodos = (count) => {
  const dummyTodos = [];
  for (let i = 1; i <= count; i++) {
    dummyTodos.push({
      id: `dummyTodo_${i}`,
      title: `Todo #${i}`,
      completed: Math.random() > 0.5,
      date: new Date().toLocaleDateString(),
    });
  }
  return dummyTodos;
};
