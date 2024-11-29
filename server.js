const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Настройка статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настройка шаблонизатора (например, EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Главная страница с формой
app.get('/', (req, res) => {
  res.render('contact'); // contact.ejs из папки views
});

// Обработка формы
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
    res.send('Message has been sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send the message.');
  }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
