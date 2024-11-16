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
app.get('/process', (req, res) => res.render('process'));
app.get('/guarantee', (req, res) => res.render('guarantee'));
app.get('/legal-info', (req, res) => res.render('legal-info'));
app.get('/web-design', (req, res) => res.render('web-design'));
app.get('/web-app-development', (req, res) =>
  res.render('web-app-development'),
);
app.get('/seo', (req, res) => res.render('seo'));
app.get('/hosting', (req, res) => res.render('hosting'));
app.get('/blog', (req, res) => res.render('blog'));
app.get('/faq', (req, res) => res.render('faq'));
app.get('/support', (req, res) => res.render('support'));
app.get('/location', (req, res) => res.render('location'));
app.get('/careers', (req, res) => res.render('careers'));
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
