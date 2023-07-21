export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'color',
            title: 'Color',
            type: 'color'
        },
        {
            name: 'icon',
            title: 'Default Icon',
            type: 'reference',
            to: [{type: 'iconImage'}]
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}]
        }
    ]
}