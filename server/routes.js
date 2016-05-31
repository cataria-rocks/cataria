const router = require('express').Router();
const got = require('got');

const controllers = require('./controllers');
const passportGitHub = require('./auth');

// Main route
router
    .get('/', controllers.index);

// Login routes
router
    .get('/login', (req, res) => { res.redirect('/auth/github'); })

    .get('/auth/github', passportGitHub.authenticate('github', { scope: ['user:email'] }))

    .get('/auth/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/')
    })
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

// GitHub routes
router
    .get('/get', controllers.GitHubApi.getContent) // Example: /get?owner=bem&repo=bem-method&path=method/key-concepts/key-concepts.ru.md
    .get('/send', ensureAuthenticated, controllers.GitHubApi.createPullRequest); // TODO: POST

// Translator routes
router
    .get('/get-translation-memory', controllers.translator.getMemory)
    .post('/save-translation-memory', ensureAuthenticated, controllers.translator.saveMemory)
    .get('/translate',controllers.translator.getTranslate);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

module.exports = router;
