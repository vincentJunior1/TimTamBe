const helper = require('../helper/response')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
module.exports = {
  registerUser: async (req, res) => {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_role,
        user_phone,
        user_address,
        user_city,
        user_post_code
      } = req.body
      if (user_name === '' || user_password === '' || user_email === '') {
        return helper.response(res, 400, 'Please Field every Field')
      } else {
        if (user_password.length <= 7) {
          return helper.response(
            res,
            400,
            'Password Length Atleast Have 8 Character'
          )
        } else {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(user_password, salt)
          const randomToken = 'sky' + Math.floor(Math.random() * 9999)
          const userCode = bcrypt.hashSync(randomToken, salt)
          const setData = {
            user_code: userCode,
            user_name,
            user_email,
            user_password: encryptPassword,
            user_role,
            user_phone,
            user_address,
            user_city,
            user_post_code,
            user_status: 0
          }
          const transporter = nodemailer.createTransport({
            host: 'smtp.google.com',
            service: 'gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'skyrouterweb6@gmail.com', // generated ethereal user
              pass: 'skyrouter6' // generated ethereal password
            }
          })
          await transporter.sendMail({
            from: '"Sky Router Confirmation Email" <skyrouterweb6@gmail.com>', // sender address
            to: user_email, // list of receivers
            subject: 'Confirmation Email', // Subject line
            html: `Click Here To Verif Your Email <b>http://localhost:3000/user/verification/${userCode}</b>` // html body
          })
          console.log(userCode)
          return helper.response(res, 200, 'Success Register Data', setData)
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Something error', error)
    }
  }
}
