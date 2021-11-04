const express = require('express');
const app = express();
const logger = require('morgan');
require('dotenv').config({ path: '../.env', debug: process.env.DEBUG });
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const PORT = process.env.PORT || 3001;
// DATABASE CONNECTION
require('./config/connection');
// ROUTE LOGGER
app.use(logger('dev'));
// Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Parse Cookies
app.use(cookieParser(process.env.SECRET));
// ROUTES
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
