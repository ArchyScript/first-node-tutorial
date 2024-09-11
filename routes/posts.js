const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')

router.get('/', verifyToken, (req, res) => {
  // res.json({
  //   posts: [
  //     { title: 'test 1', id: 'test 2' },
  //     { title: 'test 1', id: 'treedst 2' },
  //     { title: 'test 1', id: 'teerst 2' },
  //     { title: 'test 1', id: 'teresert 2' },
  //   ]
  // })

  res.send(req.user)
})

module.exports = router