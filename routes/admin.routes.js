const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Criteria = require('../models/Criteria')
const Alternative = require('../models/Alternative')


// /api/admin/criteria/all
router.get('/criteria/all', auth, async(req, res) => {
  try {
    const criteria = await Criteria.find()
    res.json(criteria)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/admin/alternatives/all
router.get('/alternatives/all', auth, async(req, res) => {
  try {
    const alternatives = await Alternative.find()
    res.json(alternatives)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

//api/admin/alternatives/add
router.post('/alternatives/add', auth, async (req, res) => {
  try {
    const {name, relevance} = req.body

    const candidate = await Alternative.findOne({name})
    if (candidate) {
      return res.status(400).json({message: 'Такая альтернатива уже существует'})
    }

    const alternative = new Alternative({
      name,
      relevance,
    })

    await alternative.save()
    res.status(201).json({message: 'Альтернатива добавлена'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

//api/admin/alternatives/delete
router.delete('/alternatives/delete', async (req, res) => {
  try {

    const name = req.body.name
    
    // const alternative = await Alternative.findOne({name})
    // await alternative.remove()

    await Alternative.deleteOne({ name })

    res.status(200).json({message: 'Альтернатива удалена'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


module.exports = router
