modules.define('toolbar', ['i-bem__dom'],
    function(provide, BEMDOM) {

        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: {
                    inited: function() {}
                }
            },

            _onButtonClick: function(e) {
                var action = e.target.getMod('toolbar-action');

                this.emit(action);
            }

        }, {
            live: function() {
                var ptp = this.prototype;

                this.liveInitOnBlockInsideEvent('click', 'button', ptp._onButtonClick);

            }
        }));

    });
