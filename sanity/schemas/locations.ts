const locations = {
  name: 'locations',
  title: 'Locations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'subspecies',
      title: 'Subspecies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'subspecies' }] }]
    },
    {
      name: 'banner',
      title: 'Banner',
      type: 'image',
    }
  ]
}

export default locations;
