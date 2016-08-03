modules.define('workspace', ['i-bem__dom', 'jquery', 'info-modal'],
    function(provide, BEMDOM, $, InfoModal) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this._editor = this.findBlockInside('editor');
                }
            }
        },

        _save: function() {
            const data = JSON.stringify(this._editor.provideData());
            data && $.post('/tm', { data: data })
                .then((response) => {
                    InfoModal.show(response);
                });
        },

        _getTranslation: function() {
            const editor = this.findBlockInside('editor');
            const data   = editor.provideData({ onlyTranslated: false });
            InfoModal.show('Loading');
            $.post('/translate', { data: JSON.stringify(data) })
                .then(response => {
                    InfoModal.hide();
                    BEMDOM.replace(editor.domElem, response);
                });
        },

        _send: () => {
            $.get('/send')
                .then((response) => {
                    console.log(response);
                });
        },

        _getTranslationMemory: function() {
            $.get('/tm' + location.search)
                .then((response) => {
                    BEMDOM.replace(this._editor.domElem, response);
                    this._editor = this.findBlockInside('editor');
                });
        },
        _showUnVerified: function() {
            this._editor.toggleMod('unverified');
        }

    }, {
        live: function() {
            var ptp = this.prototype;

            this.liveInitOnBlockInsideEvent('save', 'toolbar', ptp._save);
            this.liveInitOnBlockInsideEvent('translate', 'toolbar', ptp._getTranslation);
            this.liveInitOnBlockInsideEvent('send', 'toolbar', ptp._send);
            this.liveInitOnBlockInsideEvent('memory', 'toolbar', ptp._getTranslationMemory);
            this.liveInitOnBlockInsideEvent('showUnVerified', 'panel', ptp._showUnVerified);
        }
    }));

});
