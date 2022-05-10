const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Alternative = require('../models/Alternative')


// /api/alternative/allrelevant/
router.get('/allrelevant', auth, async(req, res) => {
  try {
    const alternatives = await Alternative.find({ relevance: true })
    res.json(alternatives)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/alternative/allirrelevant/
router.get('/allirrelevant', auth, async(req, res) => {
  try {
    const alternatives = await Alternative.find({ relevance: false })
    res.json(alternatives)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/alternative/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const alternative = await Alternative.findById(req.params.id)
    res.json(alternative)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


module.exports = router
