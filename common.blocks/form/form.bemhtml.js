block('form')(
    addJs()(true),
    tag()('form'),
    addAttrs()(function() {
        var ctx = this.ctx;

        return {
            method: ctx.method,
            action: ctx.action || '/',
            enctype: ctx.enctype
        };
    })
);
