const express = require('express');
const path = require('path');

const app = express(); // <-- сначала создаём app
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(
  '/models',
  express.static(path.join(__dirname, 'models'), {
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', '*');
    }
  })
);
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Подключаем маршруты после объявления app
const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);
const lecturersRouter = require('./routes/lecturers');
const lecturersService = require('./services/lecturersService');

const DATA_FILE_PATH = path.join(__dirname, 'data/lecturers.json');
lecturersService.init(DATA_FILE_PATH);

app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Подключаем роутеры
app.use('/lecturers', lecturersRouter);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
