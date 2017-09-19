block('main')(
    mod('view', 'blank').content()(node => {
        return !node.data.user ? '' : {
            block: 'add-document-form'
        };
    })
);
