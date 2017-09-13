modules.define('form__control', [
    'i-bem-dom', 'BEMHTML', 'input', 'popup'
], function(provide, bemDom, BEMHTML, Input, Popup) {

    /**
     * @typedef {Object} ValidationStatus
     * @property {BemEntity} control - form control that contains errors
     * @property {String} type - type of form control
     * @property {Boolean} hasErrors - are there any errors
     * @property {Object[]} log - errors log
     * @property {String} log[].type - what check has failed
     * @property {String} log[].message - localized error message
     */

    var FormControl = bemDom.declElem('form', 'control', {

        onSetMod: {
            js: {
                inited() {
                    this._control = this.findChildBlock(Input);
                    this._events(this._control).on('change', this._onControlChanged);
                }
            },

            error(modName, modVal) {
                this._control.setMod('error', modVal);
            }
        },

        getVal() {
            return this._control.getVal();
        },

        /**
         * Returns results of validation
         * @returns {ValidationStatus}
         */
        validate() {
            return {
                control: this,
                type: this.getMod('type'),
                hasErrors: false,
                log: []
            };
        },

        /**
         * Shows an error next to control
         * @param {String} errors - errors log
         */
        showError(errors) {
            if (errors.length === 0) return;

            var message = this._getErrorMessage(errors);
            var popup = this._getPopup();

            this.setMod('error');

            popup
                .setAnchor(this._getErrorAnchor())
                .setContent(BEMHTML.apply({
                    block: 'form',
                    elem: 'control-message',
                    elemMods: { theme: 'error', size: 's' },
                    content: message
                }))
                .setMod('visible');
        },

        clearError() {
            this.delMod('error');
            this._getPopup().delMod('visible');
        },

        _onControlChanged() {
            this.hasMod('error') && this.clearError();
        },

        _getErrorMessage(errors) {
            return errors.join(', ');
        },

        _getErrorAnchor() {
            return this._control;
        },

        _getPopup() {
            if (!this._popup) {
                this._popup = bemDom.append(bemDom.scope, BEMHTML.apply(this.__self._popupBemjson())).bem(Popup);
            }

            return this._popup;
        }
    }, {
        lazyInit: true,

        _popupBemjson: function() {
            return {
                block: 'popup',
                mods: {
                    theme: 'islands',
                    target: 'anchor'
                },
                directions: ['right-center']
            };
        }
    });

    provide(FormControl);
});
