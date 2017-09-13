modules.define('add-document-form', [
    'i-bem-dom', 'events', 'form'
],function(provide, bemDom, events, Form) {

    provide(bemDom.declBlock(this.name, {

        _onSubmit(e) {
            if (e.bemTarget.validate().hasErrors) {
                e.preventDefault();
            }
        }
    }, {
        lazyInit: true,
        onInit: function() {
            this._events(Form).on('submit', this.prototype._onSubmit);
        }
    }));
});
