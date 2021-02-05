const helper = require('../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const randomTokens = require('random-token')
const dotenv = require('dotenv')
dotenv.config()
const {
  registerUserModel,
  cekEmailModel,
  cekCode,
  patchUserModel
} = require('../model/m_user')
const fs = require('fs')
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_role } = req.body
      if (user_name === '' || user_password === '' || user_email === '') {
        return helper.response(res, 400, 'Please Field every Field')
      } else {
        const cekEmail = await cekEmailModel(user_email)
        if (cekEmail.length <= 0) {
          if (user_password.length <= 7) {
            return helper.response(
              res,
              400,
              'Password Length Atleast Have 8 Character'
            )
          } else {
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(user_password, salt)
            const randomToken = randomTokens(16)
            const setData = {
              user_code: randomToken,
              user_name,
              user_email,
              user_password: encryptPassword,
              user_role,
              user_phone: 0,
              user_image: 'default',
              user_address: 'default',
              user_city: 'default',
              user_post_code: 0,
              user_status: 0,
              user_updated_at: new Date()
            }
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASS // generated ethereal password
              }
            })
            const mailOPtion = {
              from: `"Sky Router "${process.env.EMAIL}`,
              to: `${user_email}`,
              subject: 'Confirmation Email',
              html: `<h2>Welcome at SkyRouter before you searching Ticket Please Activation  Your Account First on this Button</h2>
                  <p>Click This Link For Activation your account</p>
                  <a href ="http://localhost:8080/confirmEmail/${randomToken}">Activation Email</a>`
            }
            transporter.sendMail(mailOPtion, (err, result) => {
              if (err) {
                return helper.response(res, 400, 'Error Send Email', err)
              } else {
                return helper.response(res, 200, 'Success Send Email', result)
              }
            })
            const result = await registerUserModel(setData)
            return helper.response(res, 200, 'Success Register Data', result)
          }
        } else {
          return helper.response(res, 400, 'Email Already Registred')
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Something error', error)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body
      const cekEmail = await cekEmailModel(user_email)
      if (cekEmail > 0) {
        return helper.response(res, 404, 'User Not Found')
      } else {
        if (cekEmail[0].user_status === 1) {
          const password = bcrypt.compareSync(
            user_password,
            cekEmail[0].user_password
          )
          if (password) {
            const {
              user_id,
              user_name,
              user_email,
              user_role,
              user_phone,
              user_image,
              user_address,
              user_city,
              user_post_code,
              user_status
            } = cekEmail[0]
            const payload = {
              user_id,
              user_name,
              user_email,
              user_role,
              user_image,
              user_phone,
              user_address,
              user_city,
              user_post_code,
              user_status
            }
            const token = jwt.sign(payload, 'Sky_Router', { expiresIn: '12h' })
            const result = { ...payload, token }
            return helper.response(res, 200, 'Success Log In', result)
          } else {
            return helper.response(res, 404, 'Wrong Password')
          }
        } else {
          return helper.response(res, 400, 'Please Verify Your Email First')
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Your Email Not Registered', error)
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { id } = req.params
      const verification = await cekCode(id)
      if (verification.length > 0) {
        if (verification[0].user_code === id) {
          const setData = {
            ...verification[0],
            ...{ user_code: '', user_status: 1 }
          }
          await patchUserModel(setData, verification[0].user_id)
          return helper.response(res, 200, 'Success Verify User')
        }
      } else {
        return helper.response(res, 404, 'Code Not Valid')
      }
    } catch (error) {
      return helper.response(
        res,
        400,
        'Something Wrong Please Try Again',
        error
      )
    }
  },
  patchUser: async (req, res) => {
    try {
      const { user_id, user_email } = req.decodeToken
      const {
        user_name,
        user_phone,
        user_address,
        user_city,
        user_post_code
      } = req.body
      const cekEmail = await cekEmailModel(user_email)
      if (cekEmail.length > 0) {
        const setData = {
          user_name,
          user_phone,
          user_address,
          user_city,
          user_post_code,
          user_updated_at: new Date()
        }
        if (req.file === undefined) {
          const newData = {
            ...cekEmail[0],
            ...setData
          }
          const result = await patchUserModel(newData, user_id)
          return helper.response(res, 200, 'Success Patch Data', result)
        } else {
          if (cekEmail[0].user_image === 'default') {
            const newData = {
              ...cekEmail[0],
              ...setData,
              ...{ user_image: req.file.filename }
            }
            const result = await patchUserModel(newData, user_id)
            return helper.response(res, 200, 'Success Patch Data', result)
          } else {
            fs.unlink('./uploads/' + cekEmail[0].user_image, async (err) => {
              if (err) {
                return helper.response(res, 400, 'Failed Change Image')
              } else {
                const newData = {
                  ...cekEmail[0],
                  ...setData,
                  ...{ user_image: req.file.filename }
                }
                const result = await patchUserModel(newData, user_id)
                return helper.response(res, 200, 'Success Patch Data', result)
              }
            })
          }
        }
      } else {
        return helper.response(res, 400, 'Something Wrong Please Try Again')
      }
    } catch (error) {
      return helper.response(res, 400, "Can't Update profile", error)
    }
  },
  getLinkForgetPassword: async (req, res) => {
    try {
      const { user_email } = req.body
      const cekEmail = await cekEmailModel(user_email)
      if (cekEmail[0].user_status === 1) {
        if (cekEmail.length > 0) {
          const randomToken = randomTokens(16)
          const setData = {
            ...cekEmail[0],
            ...{ user_code: randomToken }
          }
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.PASS // generated ethereal password
            }
          })
          const mailOPtion = {
            from: `"Sky Router "${process.env.EMAIL}`,
            to: `${user_email}`,
            subject: 'Forgot Password',
            html: `
                  <p>Click This Link For re-new your password</p>
                  <a href ="http://localhost:8080/forgot/${randomToken}">Re-New Your password</a>`
          }
          transporter.sendMail(mailOPtion, (err, result) => {
            if (err) {
              return helper.response(res, 400, 'Error Send Email', err)
            } else {
              return helper.response(res, 200, 'Success Send Email', result)
            }
          })
          await patchUserModel(setData, cekEmail[0].user_id)
          return helper.response(
            res,
            200,
            'Success Send Link Forget Password To Your Email'
          )
        } else {
          return helper.response(res, 404, 'User Not Found')
        }
      } else {
        return helper.response(res, 400, 'Please Activate Your Email First')
      }
    } catch (error) {
      return helper.response(res, 400, 'Something Wrong Please Try Again')
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { id } = req.params
      const { user_password } = req.body
      const cekCodes = await cekCode(id)
      if (cekCodes.length > 0) {
        if (user_password === '' || user_password === undefined) {
          return helper.response(res, 400, "Password Can't Be Empty")
        } else {
          if (user_password.length <= 7) {
            return helper.response(
              res,
              400,
              'Password Atleast Have 8 Characters'
            )
          } else {
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(user_password, salt)
            const setData = {
              ...cekCodes[0],
              ...{ user_password: encryptPassword, user_code: '' }
            }
            const resetPassword = await patchUserModel(
              setData,
              cekCodes[0].user_id
            )
            return helper.response(
              res,
              200,
              'Sucess Reset Password',
              resetPassword
            )
          }
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Something wrong please try again')
    }
  },
  changePassword: async (req, res) => {
    try {
      const { user_id, user_email } = req.decodeToken
      const { user_password, newPassword } = req.body
      const cekEmail = await cekEmailModel(user_email)
      const password = bcrypt.compareSync(
        user_password,
        cekEmail[0].user_password
      )
      if (password) {
        if (cekEmail.length > 0) {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(newPassword, salt)
          const newData = {
            ...cekEmail[0],
            ...{ user_code: '', user_password: encryptPassword }
          }
          const result = await patchUserModel(newData, user_id)
          return helper.response(res, 200, 'Sucess Change Password', result)
        } else {
          return helper.response(res, 404, 'User Not Found')
        }
      } else {
        return helper.response(res, 400, 'Old Password is wrong')
      }
    } catch (error) {
      return helper.response(
        res,
        400,
        "Can't Change Password Please Try Again",
        error
      )
    }
  }
}
