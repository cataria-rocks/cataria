block('toolbar').content()(function() {
    const block = this.block;

    return [
        {
            block: 'user',
            mix: { block: 'toolbar', elem: 'user' }
        },
        {
            block: 'alternative-translation'
        },
        {
            block: 'form',
            mix: { block, elem: 'form', elemMods: { type: 'upload' }, js: true },
            content: [
                {
                    block: 'heading',
                    mods: { level: 3 },
                    content: 'Upload translation memory'
                },
                {
                    block: 'attach',
                    mods: { theme: 'islands', size: 'm' },
                    name: 'file',
                    button: 'Choose file'
                },
                {
                    block: 'button',
                    mix: { block: 'form', elem: 'button-upload' },
                    mods: { theme: 'islands', size: 'm', disabled : true, type: 'submit' },
                    text: 'Upload file'
                }
            ]
        },
        {
            block: 'form',
            action: '/downloadXliff',
            mix: { block, elem: 'form', elemMods: { type: 'download' }, js: true },
            content: [
                {
                    block: 'heading',
                    mods: { level: 3 },
                    content: 'Download translation memory'
                },
                {
                    block: 'select',
                    mods: { mode: 'radio', theme: 'islands', size: 'm'},
                    name: 'sourceLang',
                    text: "Язык перевода",
                    val: 'en',
                    options: [ { val: 'en', text: 'en' }, { val: 'ru', text: 'ru' }]
                },
                {
                    block: 'select',
                    mods: { mode: 'radio', theme: 'islands', size: 'm'},
                    name: 'targetLang',
                    val: 'ru',
                    options: [ { val: 'ru', text: 'ru' }, { val: 'en', text: 'en' }]
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', type: 'submit' },
                    mix: { block: 'form', elem: 'button-download' },
                    text: 'Download Xliff'
                }
            ]
        },
        {
            elem: 'buttons',
            content: [
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'updateTM' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Update TM'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'saveTm' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Save TM'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'translate' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Translate'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', 'toolbar-action': 'sendPR' },
                    mix: { block: 'toolbar', elem: 'action' },
                    type: 'submit',
                    text: 'Send PR'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', type: 'link' },
                    mix: { block: 'toolbar', elem: 'action' },
                    url: '/downloadTrans',
                    text: 'Download'
                },
                // {
                //     block: 'button',
                //     mods: { theme: 'islands', size: 'm', type: 'link' },
                //     mix: { block: 'toolbar', elem: 'action' },
                //     url: '/downloadXliff',
                //     text: 'Download Xliff'
                // }
            ]
        }
    ];
});
