const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Устанавливаем директорию для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настраиваем шаблоны EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Отправка главной страницы
app.get('/', (req, res) => {
  res.render('index');
});

// Отправка страницы About
app.get('/about', (req, res) => {
  res.render('about');
});

// Отправка страницы Services
app.get('/services', (req, res) => {
  res.render('services');
});

// Другие маршруты для остальных страниц
app.get('/pricing', (req, res) => {
  res.render('pricing');
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
