block('checkbox').content()(function() {
    var isChecked = this.mods.checked;

    return [
        {
            elem: 'hidden',
            tag: 'input',
            attrs: {
                type: 'hidden',
                name: this.ctx.name,
                disabled: isChecked ? 'disabled' : undefined,
                value: isChecked ? '' : 'off'
            }
        },
        applyNext()
    ];
});
