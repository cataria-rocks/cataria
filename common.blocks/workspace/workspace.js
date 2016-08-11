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
        const data = JSON.stringify(this.getData());

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
        $.post('/updateTM', { data: JSON.stringify(window.segments) })
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
                InfoModal.show('Update');// TODO:
            }).fail((err) => InfoModal.show(err));
    },

    getTranslation: function() {
        $.post('/translate', { data: JSON.stringify(window.segments) })
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
                InfoModal.show('Update');// TODO:
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
        const elem = this.findBlockInside($(this._editorUnit), 'textarea');
        const index = elem.domElem.data('index');

        elem.setVal(translation);

        window.segments[index].target.content = translation;
        console.log(window.segments[index]);
    },

    getData: function() {
        const data = [];

        window.segments.map(segment => {
            segment.target.content && data.push({
                target: segment.target.content,
                target_lang: segment.target.lang,
                // save segment into db without tags bpt/ept, but save with '[]/()'
                source: segment.source.content.replace(/<[^>]*>*/g,''),
                source_lang: segment.source.lang,
                status: segment.status
            });
        });

        return data;
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
