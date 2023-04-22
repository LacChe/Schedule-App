export default {
    name: 'iconImage',
    title: 'Icon Image',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}]
        }
    ]
}