const {Router} = require('express')
const router = Router()
const Test = require('../models/Test')
const Alternative = require('../models/Alternative')
const Criteria = require('../models/Criteria')

// /api/test/test
router.post(
  '/test', [],
  async (req, res) => {
    const {fieldA, fieldB, ababa, lol} = req.body
    const test = new Test({ fieldA, fieldB, ababa, lol })
    await test.save()
    res.status(201).json({message: 'Запись создана'})
  }
)

// /api/test/setalternatives
router.post(
  '/setalternatives', [],
  async (req, res) => {
    const {name} = req.body
    const alternative = new Alternative({ name })
    await alternative.save()
    res.status(201).json({message: 'Запись создана'})
  }
)
// /api/test/setcriteria
router.post(
  '/setcriteria', [],
  async (req, res) => {
    const {name} = req.body
    const criteria = new Criteria({ name })
    await criteria.save()
    res.status(201).json({message: 'Запись создана'})
  }
)

module.exports = router
