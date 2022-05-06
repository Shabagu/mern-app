const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Research = require('../models/Research')
const Criteria = require('../models/Criteria')
const Alternative = require('../models/Alternative')

// /api/research/new
router.post(
  '/new', auth, async (req, res) => {
    const {researchData} = req.body

    const researches = await Research.find({ owner: req.user.userId })

    const research = new Research({
      
      criteria:             researchData.criteria,
      criteriaRating:       researchData.criteriaRating,
      criteriaSum:          researchData.criteriaSum,
      criteriaNorm:         researchData.criteriaNorm,
      criteriaWeights:      researchData.criteriaWeights,
      alternatives:         researchData.alternatives,
      alternativesRating:   researchData.alternativesRating,
      alternativesSum:      researchData.alternativesSum,
      alternativesNorm:     researchData.alternativesNorm,
      alternativesWeights:  researchData.alternativesWeights,
      globalWeights:        researchData.globalWeights,

      owner: req.user.userId,
      index: researches.length + 1
    })
    await research.save()
    res.status(201).json({message: 'Данные успешно сохранены!', id: research._id})
  }
)

// /api/research/criteria/
router.get('/criteria', auth, async(req, res) => {
  try {
    const criteria = await Criteria.find()
    res.json(criteria)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/research/alternatives/
router.get('/alternatives', auth, async(req, res) => {
  try {
    const alternatives = await Alternative.find({ relevance: true })
    res.json(alternatives)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/research/recent 
router.get('/recent', auth, async (req, res) => {
  try {
    const researches = await Research.find({ owner: req.user.userId })
    const reversed = researches.reverse()
    const recent = reversed.slice(0, 3)
    res.json(recent)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/research/all
router.get('/all', auth, async(req, res) => {
  try {
    const researches = await Research.find({ owner: req.user.userId })
    const reversed = researches.reverse()
    res.json(reversed)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/research/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id)
    res.json(research)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


module.exports = router
