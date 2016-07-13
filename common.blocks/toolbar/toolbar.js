modules.define('toolbar',
    ['i-bem__dom', 'BEMHTML','jquery'],
    function(provide, BEMDOM, BEMHTML, $) {

        provide(BEMDOM.decl(this.name, {

            getTranslation: () => {
                console.log('olol');
                $.get('/translation' + location.search)
                    .then((response) => {
                        console.log(response);
                    });
            },
            send: () => {
                $.get('/send')
                    .then((response) => {
                        console.log(response);
                    });
            },
            getTranslationMemory: () => {
                $.get('/get-translation-memory' + location.search)
                    .then((response) => {
                        console.log(response);
                    });
            }

        }, {
            live: function() {
                var ptp = this.prototype;

                this.liveBindTo('translate', 'click', ptp.getTranslation);
                this.liveBindTo('send', 'click', ptp.send);
                this.liveBindTo('memory', 'click', ptp.getTranslationMemory);

            }
        }));

    });
