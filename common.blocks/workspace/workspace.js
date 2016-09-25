modules.define('workspace', ['i-bem__dom', 'querystring', 'jquery', 'info-modal'],
    function(provide, BEMDOM, qs, $, InfoModal) {
provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._editor = this.findBlockInside('editor');
                this._altTrans = this.findBlockInside('alternative-translation');
                this._spinner = this.findBlockInside('spinner');
            }
        }
    },

    saveTm: function() {
        var data = JSON.stringify(this.getData());

        data && $.post('/saveTM', { data: data })
            .then(function(response) {
                InfoModal.show(response);
            })
            .fail(function(err) {
                InfoModal.show(err.responseText || err);
            });
    },

    sendPR: function() {
        var _this = this,
            query = qs.parse(window.location.search.substr(1));

        this._spinner.setMod('visible');

        $.post('/sendPR', {
            targetFile: query.target,
            doc: query.doc,
            data: JSON.stringify(window.segments)
        })
        .then(function(response) {
            _this._spinner.delMod('visible');
            InfoModal.show(response);
        })
        .fail(function(err) {
            _this._spinner.delMod('visible');
            InfoModal.show(err.responseText || err);
        });
    },

    updateTM: function() {
        var _this = this,
            query = qs.parse(window.location.search.substr(1));

        this._spinner.setMod('visible');

        $.post('/updateTM', {
            targetFile: query.target,
            data: JSON.stringify(window.segments)
        })
        .then(function(response) {
            BEMDOM.replace(_this._editor.domElem, response);
            _this._editor = _this.findBlockInside('editor');
            _this._spinner.delMod('visible');
        })
        .fail(function(err) {
            console.log('arguments', arguments);
            _this._spinner.delMod('visible');
            InfoModal.show(err.responseText || err);
        });
    },

    getTranslation: function() {
        var _this = this;
        // TODO: WTF?
        this._spinner && this._spinner.setMod('visible');

        $.post('/translate', { data: JSON.stringify(window.segments) })
            .then(function(response) {
                BEMDOM.replace(_this._editor.domElem, response);
                _this._editor = _this.findBlockInside('editor');
                _this._spinner.delMod('visible');
            })
            .fail(function(err) {
                _this._spinner.delMod('visible');
                InfoModal.show(err.responseText || err);
            });
    },

    toggleVerified: function() {
        this.toggleMod('mode', 'unverified-only');
    },

    showAltTrans: function(e, unit) {
        var index = $(unit).data('index'),
            content = window.segments[index].altTrans;

        this._altTrans = this.findBlockInside('alternative-translation');
        BEMDOM.replace(this._altTrans.domElem, content);
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

        window.segments.map(function(segment) {
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
