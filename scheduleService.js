const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
  dataFilePath = filePath;
};

const findAll = (lecturer) => {
  const lessons = fileService.readData(dataFilePath);

  if (lecturer) {
    return lessons.filter(item =>
      item.lecturer.toLowerCase().includes(lecturer.toLowerCase())
    );
  }

  return lessons;
};

const findOne = (id) => {
  const lessons = fileService.readData(dataFilePath);
  return lessons.find(item => item.id === id);
};

const hasConflict = (lessons, lecturer, day, time, excludeId = null) => {
  return lessons.some(item =>
    item.lecturer === lecturer &&
    item.day === day &&
    item.time === time &&
    item.id !== excludeId
  );
};

const create = (lessonData) => {
  const lessons = fileService.readData(dataFilePath);

  if (hasConflict(lessons, lessonData.lecturer, lessonData.day, lessonData.time)) {
    return { error: 'У преподавателя уже есть занятие в это время' };
  }

  const newId = lessons.length > 0
    ? Math.max(...lessons.map(item => item.id)) + 1
    : 1;

  const newLesson = { id: newId, ...lessonData };
  lessons.push(newLesson);

  fileService.writeData(dataFilePath, lessons);

  return newLesson;
};

const update = (id, lessonData) => {
  const lessons = fileService.readData(dataFilePath);
  const index = lessons.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedLesson = { ...lessons[index], ...lessonData };

  if (
    hasConflict(
      lessons,
      updatedLesson.lecturer,
      updatedLesson.day,
      updatedLesson.time,
      id
    )
  ) {
    return { error: 'У преподавателя уже есть занятие в это время' };
  }

  lessons[index] = updatedLesson;
  fileService.writeData(dataFilePath, lessons);

  return lessons[index];
};

const remove = (id) => {
  const lessons = fileService.readData(dataFilePath);
  const filteredLessons = lessons.filter(item => item.id !== id);

  if (filteredLessons.length === lessons.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filteredLessons);
  return true;
};

module.exports = {
  init,
  findAll,
  findOne,
  create,
  update,
  remove
};