block('form')(
    tag()('form'),
    attrs()(function() {
        var ctx = this.ctx;

        return {
            method: ctx.method,
            action: ctx.action || '/'
        };
    })
);
