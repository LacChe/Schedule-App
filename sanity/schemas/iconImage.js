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
            name: 'darkImage',
            title: 'Dark Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'lightImage',
            title: 'Light Image',
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