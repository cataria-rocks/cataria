block('toolbar').content()(function() {
    return [
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'toolbar', elem: 'memory' },
            type: 'submit',
            text: 'Выгрузить память переводов'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'toolbar', elem: 'translate' },
            type: 'submit',
            text: 'Перевести с помощью Я.Переводчика'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'toolbar', elem: 'save' },
            type: 'submit',
            text: 'Сохранить'
        },
        {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'toolbar', elem: 'send' },
            type: 'submit',
            text: 'Отправить'
        }
    ];
});
