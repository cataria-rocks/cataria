module.exports = function(bh) {

    bh.match('checkbox', function(ctx, json) {
        var isChecked = json.mods.checked;

        return [
            {
                elem: 'hidden',
                tag: 'input',
                attrs: {
                    type: 'hidden',
                    name: json.name,
                    disabled: isChecked ? 'disabled' : undefined,
                    value: isChecked ? '' : 'off'
                }
            },
            json // TODO: there's applyNext() here in bemhtml
        ];
    });

};
