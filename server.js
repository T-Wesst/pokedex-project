const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const { config } = require('dotenv');
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
// load environment variables
config({ debug: process.env.DEBUG });
// Parse Cookies
app.use(cookieParser(process.env.SECRET));
// ROUTES
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
