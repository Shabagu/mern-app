const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  criteria: [{ type: String, required: true }],
  alternatives: [{ type: String, required: true }]
})

module.exports = model('QueryOptions', schema)
