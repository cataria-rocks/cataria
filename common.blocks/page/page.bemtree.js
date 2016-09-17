block('page').content()(node => {
    var data = node.data;

    return [
        { block: 'header' },
        { block: 'main', mods: { view: data.view } },
        { block: 'footer' },
        {
            block: 'yandex-metrica',
            params: {
                id: 39659790,
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            }
        }
    ];
});
