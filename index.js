const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Устанавливаем EJS как шаблонизатор
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Устанавливаем директорию для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Определенные маршруты
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/pricing', (req, res) => res.render('pricing'));
app.get('/portfolio', (req, res) => res.render('portfolio'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/blog', (req, res) => res.render('blog'));
app.get('/manifest.json', (req, res) =>
  res.sendFile(path.join(__dirname, 'manifest.json')),
);

// Маршрут для страницы 404
app.get('/404', (req, res) => {
  res.status(404).render('404');
});

// Перенаправление всех несуществующих маршрутов на страницу 404
app.use((req, res) => {
  res.redirect('/404');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
