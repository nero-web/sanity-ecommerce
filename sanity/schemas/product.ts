export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'name',
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            title: 'Stripe Product Id',
            name: 'stripeProductId',
            type: 'string',
        },
        {
            name: 'image',
            type: 'array',
            title: 'Image',
            of: [{type: 'image'}],
            option: {
                hotspot: true,
            },
        },
    ],

}