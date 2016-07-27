const router = require('express').Router();
const controllers = require('./controllers');
const passportGitHub = require('./auth');
const middleware = require('./middleware');
const ensureAuthenticated = middleware.ensureAuthenticated;
const keepRetpath = middleware.keepRetpath;

// Login routes
router
    .get('/auth/github', passportGitHub.authenticate('github', { scope: ['repo'] }))

    .get('/auth/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/error' }), (req, res) => {
        res.redirect(req.session.retpath || '/')
    })
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect(req.session.retpath || '/');
    });

// GitHub routes
router
    .get('/', keepRetpath, controllers.github.getContent) // Example: ?doc=https://github.com/bem/bem-method/blob/bem-info-data/articles/bem-for-small-projects/bem-for-small-projects.ru.md
    .post('/', ensureAuthenticated, controllers.github.createPullRequest);

// Translator routes
router
    .get('/tm', controllers.translator.getMemory)
    .post('/tm', ensureAuthenticated, controllers.translator.saveMemory)
    .post('/translate', controllers.translator.getTranslate);

module.exports = router;
