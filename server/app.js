const express = require('express');
const path = require('path');
const connect = require('connect');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./routes');
const controllers = require('./controllers/index');

const baseUrl = '/';
const rootDir = path.join(__dirname, '../desktop.bundles/');

const app = express();

app
    // .use(favicon(path.join(path.join(rootDir, 'index'), 'favicon.ico')))
    .use(bodyParser.json({ limit: '3mb' }))
    .use(bodyParser.urlencoded({ limit: '3mb', extended: false }))
    .use(cookieSession({ keys: ['secret1', 'secret2'] })) // TODO
    .use(passport.initialize())
    .use(passport.session())
    .use(baseUrl, routes)
    .use(baseUrl, serveStatic(path.join(rootDir, 'index')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.send(err);
});

// error handlers
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
