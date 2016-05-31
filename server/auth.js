var passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy,
    env = process.env,
    config = {};

try {
    config = require('./secret-config');
} catch (err) {
    // TODO
}

var clientID = env.EDITOR_CLIENT_ID || config.clientID,
    clientSecret = env.EDITOR_CLIENT_SECRET || config.clientSecret;

function verify(req, accessToken, refreshToken, profile, done) {
    profile = JSON.parse(profile._raw);

    return done(null, {
        token: accessToken,
        avatar: profile.avatar_url,
        login: profile.login
    });
}

module.exports = passport;

// serialize user into the session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

if (!clientID || !clientSecret) {
    console.error('Please provide clientID and clientSecret');
    return;
}

passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
}, verify));
