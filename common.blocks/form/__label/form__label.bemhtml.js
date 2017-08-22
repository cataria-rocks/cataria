block('form').elem('label')(
    tag()('label'),
    addAttrs()(function() {
        return {
            'for': this.ctx.for
        };
    })
);
