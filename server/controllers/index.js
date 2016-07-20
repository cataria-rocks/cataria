module.exports = {
    index: (req, res) => {
        res.send('Привет! Тут мы расскажем о нашем сервисе');
    },
    github: require('./github'),
    translator: require('./translator')
};
