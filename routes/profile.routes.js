const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

// /api/profile/user
router.get(
  '/user', auth, async (req, res) => {
    try {
      const user = await User.find({ _id: req.user.userID })
      res.json(user)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
)


module.exports = router
