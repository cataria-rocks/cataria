modules.define('form', ['i-bem-dom', 'events', 'form__control'],
function(provide, bemDom, events, FormControl) {

    var Form = bemDom.declBlock(this.name, {

        serializeToJson: function() {
            return this.__self.serializeToJson(this.domElem);
        },

        validate(options = {}) {
            const { show = true } = options;
            const log = this.findChildElems(FormControl).map(ctrl => ctrl.validate());
            const hasErrors = log.some(status => status.hasErrors);
            const validationStatus = { hasErrors, log };

            show && this.showValidationErrors(validationStatus);
            return validationStatus;
        },

        showValidationErrors(validationStatus) {
            const errView = this._elem('validation-error');
            const hasErrors = validationStatus.hasErrors;

            errView && errView.setMod('visible', hasErrors);
            validationStatus.log.forEach(err => err.control.showError(err.log.map(e => e.message)));
        },

        clearValidationErrors() {
            this.findChildElems(FormControl).forEach(ctrl => ctrl.clearError());
        },

        _onSubmit: function(e) {
            var event = new events.Event('submit');

            this._emit(event);
            event.isDefaultPrevented() && e.preventDefault();
        },
        _onChange: function(e) {
            var event = new events.Event('change');

            this._emit(event);
            event.isDefaultPrevented() && e.preventDefault();
        }
    }, {
        lazyInit: true,

        onInit: function() {
            var ptp = this.prototype;

            this._domEvents().on('submit', ptp._onSubmit);
            this._domEvents().on('change', ptp._onChange)

            return this.__base.apply(this, arguments);
        },

        serializeToJson: function(form) {
            var queryArr = form.serializeArray();

            return queryArr.reduce(
                function(res, pair) {
                    var name = pair.name;
                    var val = pair.value;

                    if (res.hasOwnProperty(name)) {
                        Array.isArray(res[name]) ? res[name].push(val) : res[name] = [res[name], val];
                    } else {
                        res[name] = val;
                    }

                    return res;
                },
                {});
        }
    });

    provide(Form);

});
