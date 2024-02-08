const subspecies = {
  name: 'subspecies',
  title: 'Subspecies',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'locations' }] }]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'species',
      type: 'reference',
      to: [{ type: 'species' }]
    },
    {
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}

export default subspecies;
