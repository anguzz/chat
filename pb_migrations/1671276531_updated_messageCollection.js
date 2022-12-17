migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId('dg143txrhx0l5em')

  // remove
  collection.schema.removeField('mllz0qac')

  return dao.saveCollection(collection)
})
