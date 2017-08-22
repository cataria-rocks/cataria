block('form')(
    tag()('form'),
    addAttrs()(function() {
        var ctx = this.ctx;

        return {
            method: ctx.method,
            action: ctx.action || '/'
        };
    })
);
