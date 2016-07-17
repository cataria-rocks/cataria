block('toolbar').content()(function() {
    return [
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'memory' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Выгрузить память переводов'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'translate' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Перевести с помощью Я.Переводчика'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'save' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Сохранить'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm', 'toolbar-action': 'send' },
            mix: { block: 'toolbar', elem: 'action' },
            type: 'submit',
            text: 'Отправить'
        }
    ];
});
