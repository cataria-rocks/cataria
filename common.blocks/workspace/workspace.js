modules.define('workspace', ['i-bem__dom', 'jquery', 'info-modal'],
    function(provide, BEMDOM, $, InfoModal) {
provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._editor = this.findBlockInside('editor');
                this._altTransl = this.findBlockInside('alternative-translation');
            }
        }
    },

    saveTm: function() {
        const data = JSON.stringify(this._editor.provideData());

        data && $.post('/tm', { data: data })
            .then((response) => {
                InfoModal.show(response);
            }).fail((err) => InfoModal.show(err));
    },

    _getTranslation: () => {
        $.get('/translation' + location.search)
            .then((response) => {
                console.log(response);
            });
    },

    sendPR: () => {
        $.get('/send')
            .then((response) => {
                console.log(response);
            });
    },

    getTM: function() {
        $.get('/tm' + location.search)
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
            }).fail((err) => InfoModal.show(err));
    },

    toggleVerified: function() {
        this.toggleMod('mode', 'unverified-only');
    },

    showAltTrans: function(e, data) {
        const { search, unit } = data;
        const { sourceLang, targetLang } = this.params;

        $.get(`/alt?segment=${search}&sourceLang=${sourceLang}&targetLang=${targetLang}`)
            .then((response) => {
                BEMDOM.replace(this._altTransl.domElem, response);
                this._altTransl = this.findBlockInside('alternative-translation');
                this._editorUnit = unit;
            }).fail((err) => InfoModal.show(err));
    },

    applyAltTrans: function(e, data) {
        const translation = $(data).text();

        $(this._editorUnit).val(translation);
    }

}, {
    live: function() {
        var ptp = this.prototype;

        this.liveInitOnBlockInsideEvent('saveTm', 'toolbar', ptp.saveTm)
            .liveInitOnBlockInsideEvent('translate', 'toolbar', ptp._getTranslation)
            .liveInitOnBlockInsideEvent('sendPR', 'toolbar', ptp.sendPR)
            .liveInitOnBlockInsideEvent('getTM', 'toolbar', ptp.getTM)
            .liveInitOnBlockInsideEvent('toggleVerified', 'panel', ptp.toggleVerified)
            .liveInitOnBlockInsideEvent('showAltTrans', 'editor', ptp.showAltTrans)
            .liveInitOnBlockInsideEvent('applyAltTrans', 'alternative-translation', ptp.applyAltTrans);
    }
}));

});
