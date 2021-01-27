const router = require('express').Router()
const {
  registerUser,
  loginUser,
  verifyUser,
  patchUser,
  getLinkForgetPassword,
  forgetPassword
} = require('../controller/c_user')
const uploadFilter = require('../middleware/multerProfile')
const { authorization } = require('../middleware/Auth')

router.post('/register/', registerUser)
router.post('/login/', loginUser)
router.patch('/verification/:id', verifyUser)
router.patch('/updateuser/', authorization, uploadFilter, patchUser)
router.post('/forgetpassword/', getLinkForgetPassword)
router.patch('/forgetpassword/:id', forgetPassword)

module.exports = router
