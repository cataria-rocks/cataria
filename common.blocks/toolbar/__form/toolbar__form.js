modules.define('toolbar__form', ['i-bem-dom', 'form'], function(provide, bemDom, Form) {

    const ToolbarForm = bemDom.declElem('toolbar', 'form', {
        _onSubmit: function(e) {
            const type = this.getMod('type');
            type === 'download' || e.preventDefault();
            this._emit(`submit-${type}`);
        },
        _onChange: function() {
            this._emit(`change-${this.getMod('type')}`);
        },
    }, {
        lazyInit: true,
        onInit() {
            this._events(Form)
                .on('submit', this.prototype._onSubmit)
                .on('change', this.prototype._onChange);
        }
    });

    provide(ToolbarForm);

});
