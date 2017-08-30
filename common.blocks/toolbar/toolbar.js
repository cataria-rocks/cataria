modules.define('toolbar', ['i-bem-dom', 'button', 'form', 'toolbar__form'],
    function(provide, bemDom, Button, Form, FormElem) {

provide(bemDom.declBlock(this.name, {
    _onButtonClick: function(e) {
        var action = e.bemTarget.getMod('toolbar-action');
        this._emit(action);
    },
    _onSubmitUpload: function(e) {
        e.preventDefault();
        var form = e.bemTarget.findMixedBlock(Form);
        var formData = new FormData(form.domElem[0]);

        form.findChildElem('button-upload').findMixedBlock(Button).setMod('disabled');
        this._emit('upload', formData);
    },
    _onSubmitDownload: function(e){
        e.preventDefault();
        var formData =  e.bemTarget.findMixedBlock(Form).domElem.serialize();

        this._emit('downloadXliff', formData);
    },
    _onChangeUpload: function(e) {
        e.bemTarget.findMixedBlock(Form).findChildElem('button-upload').findMixedBlock(Button).toggleMod('disabled');
    }
},  {
    lazyInit: true,
    onInit: function() {
        this._events(FormElem).on('change-upload', this.prototype._onChangeUpload);
        this._events(FormElem).on('submit-upload', this.prototype._onSubmitUpload);
        this._events(FormElem).on('submit-download', this.prototype._onSubmitDownload);
        this._events(Button).on('click', this.prototype._onButtonClick);
    }
}));

});
