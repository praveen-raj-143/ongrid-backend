const express=require("express")
const control = require("../Controller/signin")
const router = express.Router()

router.post('/signup',control.signup);
router.post('/bookademo',control.bookdemo);
router.post('/login',control.login)
router.post('/userdetails',control.userdetails)
router.post('/contactus',control.query)
module.exports = router;