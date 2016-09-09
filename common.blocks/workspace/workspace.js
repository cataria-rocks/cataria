modules.define('workspace', ['i-bem__dom', 'querystring', 'jquery', 'info-modal'],
    function(provide, BEMDOM, qs, $, InfoModal) {
provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._editor = this.findBlockInside('editor');
                this._altTrans = this.findBlockInside('alternative-translation');
                this._spiner = this.findBlockInside('spiner');
            }
        }
    },

    saveTm: function() {
        var data = JSON.stringify(this.getData());

        data && $.post('/saveTM', { data: data })
            .then(response => {
                InfoModal.show(response);
            }).fail(err => InfoModal.show(err));
    },

    sendPR: function() {
        this._spiner.setMod('visible');

        $.post('/sendPR', {
            doc: qs.parse(window.location.search).doc,
            data: JSON.stringify(window.segments)
        }).then(response => {
            this._spiner.delMod('visible');
            InfoModal.show(response);
        }).fail(err => {
            this._spiner.delMod('visible');
            InfoModal.show(err);
        });
    },

    updateTM: function() {
        this._spiner.setMod('visible');

        $.post('/updateTM', { data: JSON.stringify(window.segments) })
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
                this._spiner.delMod('visible');
            }).fail(err => {
                this._spiner.delMod('visible');
                InfoModal.show(err);
            });
    },

    getTranslation: function() {
        this._spiner.setMod('visible');

        $.post('/translate', { data: JSON.stringify(window.segments) })
            .then(response => {
                BEMDOM.replace(this._editor.domElem, response);
                this._editor = this.findBlockInside('editor');
                this._spiner.delMod('visible');
            }).fail(err => {
                this._spiner.delMod('visible');
                InfoModal.show(err);
            });
    },

    toggleVerified: function() {
        this.toggleMod('mode', 'unverified-only');
    },

    showAltTrans: function(e, unit) {
        var index = $(unit).data('index'),
            content = window.segments[index].altTrans;

        BEMDOM.replace(this._altTrans.domElem, content);
        this._altTrans = this.findBlockInside('alternative-translation');
        this._editorUnit = unit;
    },

    applyAltTrans: function(e, data) {
        var translation = $(data).html(),
            elem = $(this._editorUnit).eq(0),
            index = elem.data('index');

        elem.html(translation);

        window.segments[index].target.content = translation;
    },

    getData: function() {
        var data = [];

        window.segments.map(segment => {
            segment.target.content && data.push({
                target: segment.target.content,
                targetLang: segment.target.lang,
                // clear source of the tags for full-text search
                // ReqExp replace <bpt id=l1>[</bpt> etc.
                source: segment.source.content.replace(/<[^>]*>[^>]*>/g, ''),
                sourceHtml: segment.source.content,
                sourceLang: segment.source.lang,
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
