const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Устанавливаем EJS как шаблонизатор
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Устанавливаем директорию для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Редирект с non-www на www (с прямым доменом)
app.use((req, res, next) => {
  const host = req.headers.host;
  const url = req.url;

  if (host === 'empstateweb.com') {
    res.redirect(301, `https://www.empstateweb.com${url}`);
  } else {
    next();
  }
});

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
  const baseUrl = `https://empstateweb.com`;
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
