const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  criteria:
    [{ type: String, required: true }],
  criteraRating:
    [{ type: Array, required: true }],
  criteriaSum:
    { type: Array, required: true },
  criteriaNorm:
    [{ type: Array, required: true }],
  criteriaWeights:
    { type: Array, required: true },

  alternatives:
    [{ type: String, required: true }],
  alternativesRating:
    [{ type: Array, required: true }],
  alternativesSum:
    [{ type: Array, required: true }],
  alternativesNorm:
    [{ type: Array, required: true }],
  alternativesWeights:
    [{ type: Array, required: true }],

  globalWeights:
    { type: Array, required: true },
  
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Research', schema)
