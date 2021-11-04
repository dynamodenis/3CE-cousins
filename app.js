const path = require('path');

const sendEmail = require('./utils/email');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

dotenv.config({ path: './config.env' });

const port = 3000;

app.use(morgan('dev'));

app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendEmail({
      name,
      email,
      subject: 'Email message from 3CE website',
      message,
    });

    res
      .status(200)
      .end(
        '<h1>Email sent successfully!</h1><a href="/">&larr; Back to main site</a>'
      );
  } catch (err) {
    res
      .status(500)
      .end(
        "<h1>An error occured. Please try again!</h1><a href='/'>&larr; Back to main site</a>"
      );
  }
});

app.get('*', (req, res) => {
  res
    .status(404)
    .send("<h1>404! Page not found</h1><a href='/'>&larr; Go back</a>");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
