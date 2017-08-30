modules.define('toolbar__form', ['i-bem-dom', 'form'], function(provide, bemDom, Form) {
    const ToolbarForm = bemDom.declElem('toolbar', 'form', {
        _onSubmit: function(e) {
            e.preventDefault();
            this._emit(`submit-${this.getMod('type')}`);
        },
        _onChange: function(e) {
            e.preventDefault();
            this._emit(`change-${this.getMod('type')}`);
        },
    }, {
        lazyInit: true,
        onInit() {
            this._events(Form).on('submit', this.prototype._onSubmit);
            this._events(Form).on('change', this.prototype._onChange);
        }
    });

    provide(ToolbarForm);

});
