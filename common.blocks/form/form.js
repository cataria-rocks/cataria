modules.define('form', ['i-bem-dom', 'events'], function(provide, bemDom, events) {

    var Form = bemDom.declBlock(this.name, {

        serializeToJson: function() {
            return this.__self.serializeToJson(this.domElem);
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
