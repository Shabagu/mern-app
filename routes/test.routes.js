const {Router} = require('express')
const router = Router()
const Test = require('../models/Test')

// /api/test/test
router.post(
  '/test', [],
  async (req, res) => {
    const {fieldA, fieldB} = req.body
    const test = new Test({ fieldA, fieldB })
    await test.save()
    res.status(201).json({message: 'Запись создана'})
  }
)



module.exports = router
