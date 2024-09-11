const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validations/auth')

router.post('/register', async (req, res) => {
  const { error, value } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = value
  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) return res.status(400).send('User already exist');


  // hash password
  const salt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(value.password, salt)

  // created user
  const user = new User({
    ...value, password: hashedPassword

  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(error);
  }
})


router.post('/login', async (req, res) => {
  const { error, value } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = value
  const user = await User.findOne({ email })
  if (!user) return res.status(400).send('User does not exist');


  // check if pasword is correct
  const validPassword = await bcrypt.compare(value.password, user.password)
  if (!validPassword) return res.status(400).send('Email or password not correct');

  // create and assign token
  // save to env 
  const token = jwt.sign({ _id: user._id, }, process.env.TOKEN_SECRET || '', { expiresIn: '30s' })
  res.header('auth-token', token)
  res.send({ token })

})
module.exports = router 