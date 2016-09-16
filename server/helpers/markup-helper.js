function createTags(text) {
    const tagBptEpt = text.match(/<[^>]*>*[^>]*>/g);

    tagBptEpt && tagBptEpt.forEach(function(value, index) {
        const param = { true: 'open', false: 'close' }[index % 2 === 0];
        const code = index === 0 ? 1 : (index % 2 === 0 ? index : (index - 1));
        const tag = `<hr class = 'markup-tag markup-tag_type_${param} markup-tag_code_${code}'
            data-value = '${value}'>`;

        text = text.replace(value, tag);
    });

    return text;
}

module.exports = {
    createTags
};
