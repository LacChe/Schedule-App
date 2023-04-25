export default {
    name: 'task',
    title: 'Task',
    type: 'document',
    fields: [
        {
            name: 'date',
            title: 'Date',
            type: 'date'
        },
        {
            name: 'amount',
            title: 'Amount',
            type: 'number'
        },
        {
            name: 'notes',
            title: 'Notes',
            type: 'text'
        },
        {
            name: 'taskType',
            title: 'Task',
            type: 'reference',
            to: [{type: 'taskType'}]
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}]
        }
        
    ]
}