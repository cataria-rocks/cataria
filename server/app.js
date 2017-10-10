const path = require('path');

const express = require('express');
// const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const morgan = require('morgan');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./routes');

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = '/';
const rootDir = path.join(__dirname, '../desktop.bundles/');

const app = express();

require('debug-http')();

app
    .disable('x-powered-by')
    .enable('trust proxy')
    // .use(favicon(path.join(rootDir, 'favicon.ico')))
    .get('/ping', (req, res) => res.end())
    .use(morgan('combined'))
    .use(bodyParser.json({ limit: '25mb' }))
    .use(bodyParser.urlencoded({ limit: '25mb', extended: false }))
    .use(cookieSession({ keys: ['secret1', 'secret2'] })) // TODO
    .use(passport.initialize())
    .use(passport.session())
    .use(baseUrl, routes)
    .use(baseUrl, serveStatic(path.join(rootDir, 'index')));

isDev && require('./rebuild')(app);

// catch 404 and forward to error handler
app.use((req, res) => {
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
