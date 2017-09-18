modules.define('workspace', [
    'i-bem-dom', 'uri__querystring', 'jquery', 'info-modal',
    'editor', 'spinner', 'toolbar', 'attach'
], function(provide, bemDom, qs, $, InfoModal, Editor, Spinner, Toolbar, Attach) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._editor = this.findChildBlock(Editor);
                this._spinner = this.findChildBlock(Spinner);
                this._attach = this.findChildBlock(Attach);
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
            bemDom.replace(_this._editor.domElem, response);
            _this._editor = _this.findChildBlock(Editor);
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
        this._spinner.setMod('visible');

        $.post('/translate', { data: JSON.stringify(window.segments) })
            .then(function(response) {
                bemDom.replace(_this._editor.domElem, response);
                _this._editor = _this.findChildBlock(Editor);
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

    getData: function() {
        return window.segments.reduce(function(acc, segment) {
            segment.target.content && acc.push({
                target: segment.target.content,
                targetLang: segment.target.lang,
                // clear source of the tags for full-text search
                // ReqExp replace <bpt id=l1>[</bpt> etc.
                source: segment.source.content.replace(/<[^>]*>[^>]*>/g, ''),
                sourceHtml: segment.source.content,
                sourceLang: segment.source.lang,
                status: segment.status
            });

            return acc;
        }, []);
    },

    uploadTM: function(event, data) {
        var _this = this;
        $.ajax({
            url: '/uploadTM',
            data: data,
            type: 'POST',
            contentType: false,
            processData: false
        })
        .then(function(response) {
            InfoModal.show(response);
            _this._attach.clear();
        })
        .fail(function(err) {
            console.error(err.responseText || err);
            InfoModal.show('The File Upload was not successful');
        });
    }
}, {
    lazyInit: true,
    onInit: function() {
        var ptp = this.prototype;

        this._events(Toolbar)
            .on('saveTm', ptp.saveTm)
            .on('translate', ptp.getTranslation)
            .on('sendPR', ptp.sendPR)
            .on('updateTM', ptp.updateTM)
            .on('upload', ptp.uploadTM)
            .on('toggleVerified', ptp.toggleVerified);

    }
}));

});
