modules.define('workspace', ['i-bem__dom', 'jquery', 'info-modal'],
    function(provide, BEMDOM, $, InfoModal) {
provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._editor = this.findBlockInside('editor');
                this._altTrans = this.findBlockInside('alternative-translation');
            }
        }
    },

    saveTm: function() {
        const data = JSON.stringify(this._editor.provideData());

        data && $.post('/saveTM', { data: data })
            .then((response) => {
                InfoModal.show(response);
            }).fail((err) => InfoModal.show(err));
    },

    sendPR: () => {
        $.get('/sendPR')
            .then((response) => {
                console.log(response);
            });
    },

    updateTM: function() {
        $.get('/updateTM' + location.search)
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
            }).fail((err) => InfoModal.show(err));
    },

    getTranslation: function() {
        $.get('/translate' + location.search)
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
            }).fail((err) => InfoModal.show(err));
    },

    toggleVerified: function() {
        this.toggleMod('mode', 'unverified-only');
    },

    showAltTrans: function(e, unit) {
        const index = $(unit).data('index');
        const content = window.segments[index].altTrans;

        BEMDOM.replace(this._altTrans.domElem, content);
        this._altTrans = this.findBlockInside('alternative-translation');
        this._editorUnit = unit;
    },

    applyAltTrans: function(e, data) {
        const translation = $(data).text();

        $(this._editorUnit).val(translation);
    }

}, {
    live: function() {
        var ptp = this.prototype;

        this.liveInitOnBlockInsideEvent('saveTm', 'toolbar', ptp.saveTm)
            .liveInitOnBlockInsideEvent('translate', 'toolbar', ptp.getTranslation)
            .liveInitOnBlockInsideEvent('sendPR', 'toolbar', ptp.sendPR)
            .liveInitOnBlockInsideEvent('updateTM', 'toolbar', ptp.updateTM)
            .liveInitOnBlockInsideEvent('toggleVerified', 'panel', ptp.toggleVerified)
            .liveInitOnBlockInsideEvent('showAltTrans', 'editor', ptp.showAltTrans)
            .liveInitOnBlockInsideEvent('applyAltTrans', 'alternative-translation', ptp.applyAltTrans);
    }
}));

});
