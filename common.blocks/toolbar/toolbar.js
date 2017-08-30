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
        var formData =  e.bemTarget.findMixedBlock(Form).serializeToJson();
        this._emit('downloadXliff', formData);
    },
    _onChangeUpload: function(e) {
        e.bemTarget.findMixedBlock(Form).findChildElem('button-upload').findMixedBlock(Button).toggleMod('disabled');
    },
    _onChangeDownload: function() {
        //e.bemTarget.findMixedBlock(Form).findChildElem('button-upload').findMixedBlock(Button).toggleMod('disabled');
    }
},  {
    lazyInit: true,
    onInit: function() {
        var ptp = this.prototype;

        this._events(FormElem)
            .on('change-upload', ptp._onChangeUpload)
            .on('change-download', ptp._onChangeUpload)
            .on('submit-upload', ptp._onSubmitUpload)
            .on('submit-download', ptp._onSubmitDownload);

        this._events(Button).on('click', ptp._onButtonClick);
    }
}));

});
