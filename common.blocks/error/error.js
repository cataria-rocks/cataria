modules.define('error', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {

            }
        }
    }
}, {
    show: function(content, anchor) {
        this.getPopup()
            .setContent(content)
            .setAnchor(anchor)
            .setMod('visible');

        return this;
    },

    hide: function() {
        this.getPopup().delMod('visible');

        return this;
    },

    toggle: function() {
        this.getPopup().toggleMod('visible');

        return this;
    },

    getPopup: function() {

        if (this.__self.getPopup()) return;

        this.__self._popup = this.findBlockInside('popup');

        return this._popup;
    }
}));
});
