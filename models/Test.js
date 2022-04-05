const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
  fieldA: [{ type: String, required: true }],
  fieldB: [{ type: String, required: true }],
  date: { type: Date, default: Date.now },
  ababa: [{ type: String, required: true }],
  lol: { type: Array }
})

module.exports = model('Test', schema)
