const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3002;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/govPrtnr.htm', (req, res) => {
  res.render('govPrtnr');
});

app.get('/profile.htm', (req, res) => {
  res.render('profile');
});

app.get('/Staff.htm', (req, res) => {
  res.render('Staff');
});

app.get('/Engineering.htm', (req, res) => {
  res.render('Engineering');
});

app.get('/contracts.htm', (req, res) => {
  res.render('contracts');
});

app.get('/SeaPorte.htm', (req, res) => {
  res.render('SeaPorte');
});

app.get('/employment.htm', (req, res) => {
  res.render('employment');
});

app.get('/Contact.htm', (req, res) => {
  res.render('Contact');
});

// Add a POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
  const { email, name, company, phone, message } = req.body;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'mail.empstateweb.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@empstateweb.com',
      pass: '', // Replace with your secure password
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'support@empstateweb.com', // Your receiving email address
    subject: 'New Form Submission',
    html: `
      <h2>Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/thank-you.html'); // Redirect to a thank-you page
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send the message.');
  }
});

// Add a route for the thank-you page
app.get('/thank-you.html', (req, res) => {
  res.render('thank-you');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
