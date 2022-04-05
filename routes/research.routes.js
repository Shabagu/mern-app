const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Research = require('../models/Research')

// /api/research/new
router.post(
  '/new', auth, async (req, res) => {
    const {from} = req.body

    const research = new Research({
      criteria: from.criteria,
      criteraRating: from.criteraRating,
      criteriaSum: from.criteriaSum,
      criteriaNorm: from.criteriaNorm,
      criteriaWeights: from.criteriaWeights,
      alternatives: from.alternatives,
      alternativesRating: from.alternativesRating,
      alternativesSum: from.alternativesSum,
      alternativesNorm: from.alternativesNorm,
      alternativesWeights: from.alternativesWeights,
      globalWeights: from.globalWeights,
      owner: req.user.userID
    })
    await research.save()
    res.status(201).json({message: 'Данные успешно сохранены!'})
  }
)

// /api/research/
router.get('/', auth, async(req, res) => {
  try {
    const researches = await Research.find({ owner: req.user.userID })
    res.json(researches)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})



module.exports = router
