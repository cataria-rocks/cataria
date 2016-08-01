modules.define('panel', ['i-bem__dom'],
    function(provide, BEMDOM) {

        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: {
                    inited: function() {}
                }
            },

            _showUnVerified: function() {
                this.emit('showUnVerified');
            }

        }, {
            live: function() {
                var ptp = this.prototype;

                this.liveBindTo('show', 'change', ptp._showUnVerified);
            }
        }));

    });
