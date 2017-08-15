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
        res.redirect(req.session.retpath || '/');
    })
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect(req.session.retpath || '/');
    });

router
    .get('/', keepRetpath, controllers.getContent) // Example: ?doc=https://github.com/bem/bem-method/blob/bem-info-data/articles/bem-for-small-projects/bem-for-small-projects.ru.md
    .get('/about', keepRetpath, (req, res) => { res.send('Привет, тут мы расскажем о нашем сервисе') })
    .post('/sendPR', ensureAuthenticated, controllers.createPullRequest)
    .post('/translate', controllers.getYaTranslate)
    .post('/updateTM', controllers.updateTM)
    .post('/saveTM', ensureAuthenticated, controllers.saveMemory)
    .get('/downloadTrans', ensureAuthenticated, controllers.downloadTrans);

module.exports = router;
