modules.define('form__control', [
    'i-bem-dom'
], function(provide, bemDom, FormControl) {

    FormControl.declMod({ modName: 'required', modVal: true }, {

        validate(...args) {
            const status = this.__base(...args);

            if (this._isEmpty()) {
                status.hasErrors = true;
                status.log.push({
                    type: 'required',
                    message: 'Required field'
                });
            }

            return status;
        },

        /**
         * Checks weather a value is empty
         * @returns {Boolean}
         * @protected
         */
        _isEmpty() {
            return this._control.getVal().length === 0;
        }
    });

    provide(FormControl);

});
