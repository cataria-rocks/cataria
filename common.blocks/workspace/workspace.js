modules.define('workspace', ['i-bem__dom', 'jquery'],
    function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this._editor = this.findBlockInside('editor');
                }
            }
        },

        _save: function() {
            $.post('/save-translation-memory', { data: JSON.stringify(this._editor.provideData()) })
                .then((response) => {
                    console.log(response);
                });
        },
        _getTranslation: () => {
            $.get('/translation' + location.search)
                .then((response) => {
                    console.log(response);
                });
        },
        _send: () => {
            $.get('/send')
                .then((response) => {
                    console.log(response);
                });
        },
        _getTranslationMemory: () => {
            $.get('/get-translation-memory' + location.search)
                .then((response) => {
                    console.log(response);
                });
        }

    }, {
        live: function() {
            var ptp = this.prototype;

            this.liveInitOnBlockInsideEvent('save', 'toolbar', ptp._save);
            this.liveInitOnBlockInsideEvent('translate', 'toolbar', ptp._getTranslation);
            this.liveInitOnBlockInsideEvent('send', 'toolbar', ptp._send);
            this.liveInitOnBlockInsideEvent('memory', 'toolbar', ptp._getTranslationMemory);
        }
    }));

});
