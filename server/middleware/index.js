module.exports = {
    keepRetpath: function(req, res, next) {
        req.session.retpath = req.originalUrl;
        return next();
    },
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) return next();

        return res.send('You need to log in');
    }
};
