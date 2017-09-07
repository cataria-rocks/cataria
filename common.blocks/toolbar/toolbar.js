modules.define('toolbar', ['i-bem-dom', 'button', 'form', 'select', 'toolbar__form'],
    function(provide, bemDom, Button, Form, Select, FormElem) {

provide(bemDom.declBlock(this.name, {
    _onButtonClick: function(e) {
        const action = e.bemTarget.getMod('toolbar-action');
        action && this._emit(action);
    },
    _onSubmitUpload: function(e) {
        e.preventDefault();
        const form = e.bemTarget.findMixedBlock(Form);
        const formData = new FormData(form.domElem[0]);

        form.findChildElem('button-upload').findMixedBlock(Button).setMod('disabled');
        this._emit('upload', formData);
    },
    _onChangeUpload: function(e) {
        e.bemTarget.findMixedBlock(Form).findChildElem('button-upload').findMixedBlock(Button).toggleMod('disabled');
    },
    _onChangeDownload: function(e) {
        const form = e.bemTarget.findParentBlock(Form);
        const data = form.serializeToJson();
        form.findChildElem('button-download').findMixedBlock(Button).setMod('disabled', data.sourceLang == data.targetLang);
    }
},  {
    lazyInit: true,
    onInit: function() {
        var ptp = this.prototype;

        this._events(FormElem)
            .on('change-upload', ptp._onChangeUpload)
            .on('submit-upload', ptp._onSubmitUpload)

        this._events(Button).on('click', ptp._onButtonClick);
        this._events(Select).on('change', ptp._onChangeDownload);
    }
}));

});
