modules.define('info-modal', ['i-bem-dom', 'modal'], function(provide, bemDom, Modal) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {

                if (this.__self.getModal()) return;

                this.__self._modal = this.findChildBlock(Modal);
            }
        }
    }
}, {
    show: function(content) {
          this.getModal()
            .setContent(content)
            .setMod('visible');

        return this;
    },

    hide: function() {
        this.getModal().delMod('visible');

        return this;
    },
    toggle: function() {
        this.getModal().toggleMod('visible');

        return this;
    },
    getModal: function() {
        return this._modal;
    }
}));

});
