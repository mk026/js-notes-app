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
