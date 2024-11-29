const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Устанавливаем EJS как шаблонизатор
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Устанавливаем директорию для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Определенные маршруты
const routes = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/about', changefreq: 'weekly', priority: 0.8 },
  { loc: '/services', changefreq: 'weekly', priority: 0.8 },
  { loc: '/pricing', changefreq: 'monthly', priority: 0.7 },
  { loc: '/portfolio', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
  { loc: '/process', changefreq: 'monthly', priority: 0.6 },
  { loc: '/guarantee', changefreq: 'monthly', priority: 0.6 },
  { loc: '/legal-info', changefreq: 'yearly', priority: 0.5 },
  { loc: '/web-design', changefreq: 'monthly', priority: 0.7 },
  { loc: '/web-app-development', changefreq: 'monthly', priority: 0.7 },
  { loc: '/seo', changefreq: 'monthly', priority: 0.7 },
  { loc: '/hosting', changefreq: 'monthly', priority: 0.6 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
  { loc: '/faq', changefreq: 'yearly', priority: 0.5 },
  { loc: '/support', changefreq: 'monthly', priority: 0.6 },
  { loc: '/location', changefreq: 'yearly', priority: 0.5 },
  { loc: '/careers', changefreq: 'yearly', priority: 0.5 },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.5 },
  { loc: '/legal-disclaimer', changefreq: 'yearly', priority: 0.5 },
];

// Добавляем маршрут для генерации карты сайта
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = `https://www.empstateweb.com`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
  `,
    )
    .join('')}
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Основные маршруты
routes.forEach((route) => {
  app.get(route.loc, (req, res) =>
    res.render(route.loc === '/' ? 'index' : route.loc.substring(1)),
  );
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you'); // Отображает шаблон "thank-you.ejs"
});

// Маршрут для отправки контактной формы
app.post('/submit-contact-form', async (req, res) => {
  const { 'first-name': firstName, email, phone, message } = req.body;

  // Настройка Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'mail.empstateweb.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@empstateweb.com',
      pass: 'V%614ed5e692607d',
    },
  });

  const mailOptions = {
    from: '"EmpState Web" <support@empstateweb.com>',
    to: 'support@empstateweb.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('/thank-you'); // Перенаправляем на страницу благодарности
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send the message.');
  }
});

// Маршрут для страницы благодарности
app.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

// Маршрут для страницы 404
app.get('/404', (req, res) => {
  res.status(404).render('404');
});

// Перенаправление всех несуществующих маршрутов на страницу 404
app.use((req, res) => {
  res.redirect('/404');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
