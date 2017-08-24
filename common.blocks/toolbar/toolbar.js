modules.define('toolbar', ['i-bem-dom', 'button', 'form'], function(provide, bemDom, Button, Form) {

provide(bemDom.declBlock(this.name, {
    _onButtonClick: function(e) {
        var action = e.bemTarget.getMod('toolbar-action');

        this._emit(action);
    },
    _onSubmit: function(e) {
        e.preventDefault();
        var form = e.bemTarget,
            formData = new FormData(form.domElem[0]);

        form.findChildElem('button-upload').findMixedBlock(Button).setMod('disabled');
        this._emit('submit', formData);
    },
    _onChange: function(e) {
        e.bemTarget.findChildElem('button-upload').findMixedBlock(Button).toggleMod('disabled');
    }

}, {
    lazyInit: true,
    onInit: function() {
        this._events(Form).on('change', this.prototype._onChange);
        this._events(Form).on('submit', this.prototype._onSubmit);
        this._events(Button).on('click', this.prototype._onButtonClick);
    }
}));

});
