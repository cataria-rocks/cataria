const fs = require('fs');
const app = require('./app');
const env = process.env;
const portOrSocket = env.PORT || 3000;

exports.start = function() {
    app
        .listen(portOrSocket, () => {
            console.log('app started on %s', portOrSocket);
            isNaN(portOrSocket) && fs.chmod(portOrSocket, '0777');
        })
        .once('error', (err) => {
            console.log('worker %s has failed to start application', process.pid);

            if (err.code === 'EADDRINUSE') {
                console.log('port or socket %s is taken', portOrSocket);
                process.kill();
                return;
            }

            console.log(err.stack);
        });
};

if (!module.parent) {
    if (fs.existsSync(portOrSocket)) {
        try {
            fs.unlinkSync(portOrSocket);
        } catch (e) {}
    }

    exports.start();
}
