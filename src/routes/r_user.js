const router = require('express').Router()
const {
  registerUser,
  loginUser,
  verifyUser,
  patchUser
} = require('../controller/c_user')
const uploadFilter = require('../middleware/multerProfile')
const { authorization } = require('../middleware/Auth')

router.post('/register/', registerUser)
router.post('/login/', loginUser)
router.patch('/verification/:id', verifyUser)
router.patch('/updateuser/', authorization, uploadFilter, patchUser)

module.exports = router
