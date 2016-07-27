modules.define('checkbox', function(provide, Checkbox) {
    provide(Checkbox.decl({
        _onChange: function() {
            this.__base.apply(this, arguments);

            var hidden = this.elem('hidden');

            this.elem('control').prop('checked') ?
                hidden.prop({ disabled: 'disabled' }) :
                hidden.prop({ value: 'off', disabled: false });
        }
    }));
});
