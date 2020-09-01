const express = require('express');
const app = express();
const logger = require('morgan');
const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const { PORT } = process.env;
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

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
