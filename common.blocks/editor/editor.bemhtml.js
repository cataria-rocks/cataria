block('editor')(
    tag()('form'),
    js()(true),
    elem('target').attrs()({ contentEditable: true })
);
