modules.define('editor', ['i-bem-dom', 'jquery', 'checkbox'], function(provide, bemDom, $, Checkbox) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            inited: function() {
                this._domEvents().on('keydown', this.onKeyDown);
            }
        }
    },
    /**
     * method for insert tags as html node into div contenteditable = true
     * @param {String} tag
     * @private
     */
    _insertTag: function(tag) {
        var selection = window.getSelection(),
            range = (selection.getRangeAt && selection.rangeCount) && selection.getRangeAt(0);

        range.deleteContents();

        // prepare document fragment with tag for insert to Range-object
        var el = document.createElement('div'),
            frag = document.createDocumentFragment(),
            node, lastNode;

        el.innerHTML = tag;

        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }

        range.insertNode(frag);

        // Preserve the selection to insert caret
        if (!lastNode) return;

        range = range.cloneRange();
        range.setStartAfter(lastNode); // set caret for end of this area
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);

    },

    onKeyDown: function(e) {
        // key codes for 'ALT + [1-9]' combinations
        var keyCode = { 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9 }[e.keyCode];

        if (!(e.altKey && keyCode)) return;

        var elem = this.findElem($(e.target), 'textarea'),
            index = elem.data('index'),
            // array of all available tags, example: ['<bpt id=l1>[</bpt>', '<ept id=l1>]</ept>', ...]
            keys = window.segments[index].keys,
            openTag = keys[keyCode * 2 - 2], // 'keyCode * 2 - 2' is index of open tag in keys array
            closeTag = keys[keyCode * 2 - 1]; // same as previous

        if (!keys.length || !openTag) return false; // if button doesn't have tags

        var text = elem.html(),
            caretPos = window.getSelection().getRangeAt(0).startOffset,
            availableTags = [
                { tag: openTag, position: text.indexOf(openTag) },
                { tag: closeTag, position: text.indexOf(closeTag) }
            ];

        if (availableTags[0].position === -1) {
            if (availableTags[1].position > -1 && (caretPos > availableTags[1].position)) return false;
            this._insertTag(availableTags[0].tag);
        } else if (availableTags[1].position === -1) {
            this._insertTag(availableTags[1].tag);
        }

        e.preventDefault();
    },

    onFocusIn: function(e) {
        console.log('********************',e.target);
        this.setMod($(e.target.parentNode), 'focused').emit('showAltTrans', e.target);
    },

    onFocusOut: function(e) {
        var elem = $(e.target),
            index = elem.data('index');

        window.segments[index].target.content = elem.html();
        this.delMod($(e.target.parentNode), 'focused');
    },

    onInput: function(e) {
        e.preventDefault();

        var text = (e.originalEvent || e).clipboardData.getData('text/plain');

        document.execCommand('insertHTML', false, text);
    },

    setStatus: function(e) {
        var index = $(e.target.domElem).data('index');

        window.segments[index].status = e.target.getMod('checked');
    }
}, {
    lazyInit: true,
    onInit: function() {
        var ptp = this.prototype;

        this._events('target')
            .on('focusin', ptp.onFocusIn)
            .on('focusout', ptp.onFocusOut)
            .on('paste', ptp.onInput);

        this._events(Checkbox).on({ modName: 'checked', modVal: '*' }, this.prototype.setStatus);
    }
}));

});
