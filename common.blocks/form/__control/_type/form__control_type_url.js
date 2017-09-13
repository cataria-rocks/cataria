modules.define('form__control', [
    'i-bem-dom'
], function(provide, bemDom, FormControl) {

    FormControl.declMod({ modName: 'type', modVal: 'url' }, {

        validate(...args) {
            const href = this._control.getVal();
            const status = this.__base(...args);

            if (!href) return status;

            if (!this._isValid(href)) {
                status.hasErrors = true;
                status.log.push({
                    type: 'url',
                    message: 'Invalid link'
                });
            }

            return status;
        },

        _isValid(href) {
            if (!href) return false;

            const _domainRegExp = '(?:(?:[_a-zа-яёЄІЇєіїҐґ0-9][~_\\-\\._a-zа-яёЄІЇєіїҐґ0-9-]*)\\.)([a-z0-9а-яёЄІЇєіїҐґ]{2,15}|xn--[a-z0-9-])';

            const _hrefRegExp = new RegExp('^\\s*(?:http(s)?://)?' + _domainRegExp + '(?:\\s*$|/|:\\d|\\?|#)', 'i');

            return href.trim().match(_hrefRegExp) !== null;
        }
    });

    provide(FormControl);

});
