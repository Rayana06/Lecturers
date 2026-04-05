const scheduleService = require('../services/scheduleService');

const getAll = (req, res) => {
  const { lecturer } = req.query;
  const lessons = scheduleService.findAll(lecturer);
  res.json(lessons);
};

const getById = (req, res) => {
  const item = scheduleService.findOne(parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ error: 'Занятие не найдено' });
  }

  res.json(item);
};

const create = (req, res) => {
  const { lecturer, subject, day, time, room } = req.body;

  if (!lecturer || !subject || !day || !time || !room) {
    return res.status(400).json({ error: 'Не все поля заполнены' });
  }

  const result = scheduleService.create({
    lecturer,
    subject,
    day,
    time,
    room
  });

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json(result);
};

const update = (req, res) => {
  const result = scheduleService.update(parseInt(req.params.id), req.body);

  if (!result) {
    return res.status(404).json({ error: 'Занятие не найдено' });
  }

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
};

const remove = (req, res) => {
  const success = scheduleService.remove(parseInt(req.params.id));

  if (!success) {
    return res.status(404).json({ error: 'Занятие не найдено' });
  }

  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};