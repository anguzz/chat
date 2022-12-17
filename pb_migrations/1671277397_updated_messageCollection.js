migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId('dg143txrhx0l5em')

  // remove
  collection.schema.removeField('mllz0qac')

  // add
  collection.schema.addField(new SchemaField({
    system: false,
    id: 'gqt6gabs',
    name: 'userName',
    type: 'text',
    required: true,
    unique: false,
    options: {
      min: null,
      max: null,
      pattern: ''
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId('dg143txrhx0l5em')

  // add
  collection.schema.addField(new SchemaField({
    system: false,
    id: 'mllz0qac',
    name: 'userName',
    type: 'relation',
    required: true,
    unique: false,
    options: {
      maxSelect: 1,
      collectionId: '_pb_users_auth_',
      cascadeDelete: false
    }
  }))

  // remove
  collection.schema.removeField('gqt6gabs')

  return dao.saveCollection(collection)
})
