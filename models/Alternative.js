const {Schema, model} = require('mongoose')

const schema = new Schema ({
  name: { type: String },
  relevance: {type: Boolean },
})

module.exports = model('Alternative', schema)
