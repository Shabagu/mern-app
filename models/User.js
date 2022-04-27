// const {Schema, model, Types} = require('mongoose')
const {Schema, model} = require('mongoose')

const schema = new Schema ({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'client' },
  tel: { type: Number, default: null },
  _firstName: { type: String },
  _secondName: { type: String },
  _patronymic: { type: String },
})

module.exports = model('User', schema)
