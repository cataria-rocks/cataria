const renderer = require('../renderer');

module.exports = {
    index: (req, res) => {
        console.log(req.session.passport);
        res.send('Привет! Тут мы расскажем о нашем сервисе');
    },
    GitHubApi: require('./GitHubApi'),
    translator: require('./translator')
};
