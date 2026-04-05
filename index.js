const express = require('express');
const path = require('path');
const scheduleRouter = require('./routes/schedule');
const scheduleService = require('./services/scheduleService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data', 'schedule.json');
scheduleService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Сервер расписания преподавателей работает!');
});

app.use('/schedule', scheduleRouter);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});