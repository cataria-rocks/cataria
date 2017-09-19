block('main')(
    mod('view', 'blank').content()(node => {
        return !node.data.user ? {
            block: 'project-info'
        } : {
            block: 'add-document-form'
        };
    })
);
