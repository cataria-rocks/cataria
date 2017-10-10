modules.define('main', ['form', 'error'], function(provide, Form, Error, Main) {

    provide(Main.decl({ modName: 'view', modVal: 'blank' }, {

        _onSubmit: function(e) {
            e.preventDefault();

            var _this = e.target;

            var doc = _this.findBlockInside('doc', 'input');
            var docVal = doc.getVal().trim();
            var target = _this.findBlockInside('target', 'input');
            var targetVal = target.getVal().trim();

            if (!docVal) {

                doc.setMod('error');
                Error.show('Пожалуйста, укажите URL исходного документа', doc);

            }

            if (!targetVal) {
                target.setMod('error');
            }
        }

    },
        {
            live: function() {

                // this.liveInitOnBlockInsideEvent('submit', 'form', function() {

                //     Form.on(this.domElem, 'submit', this._onSubmit, this);

                // });

                this.liveInitOnBlockInsideEvent('submit', 'form', this.prototype._onSubmit);
            }
        }
    ));
});
