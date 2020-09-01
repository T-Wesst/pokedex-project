const { set, connect } = require('mongoose');
const url = process.env.DATABASEURL || 'mongodb://localhost/pokedex';
set('debug', true);
connect(url, { useNewUrlParser: true, useCreateIndex: true, keepAlive: true });
