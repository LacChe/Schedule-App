export default {
    name: 'taskType',
    title: 'TaskType',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'reference',
            to: [{type: 'iconImage'}]
        },
        {
            name: 'unit',
            title: 'Unit',
            type: 'string'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{type: 'category'}]
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}]
        }

    ]
}