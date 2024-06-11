const express = require('express')
const router = express.Router()
const {registerSchema,loginSchema} = require("../middlewares/validate.schema")
const {authRequired} = require('../middlewares/validateToken')
const {login,register,logout,profile,verifyToken} = require('../controller/auth.controller')
const {validateSchema} = require('../middlewares/validatos.middleware')

router.post('/register',validateSchema(registerSchema),register)
router.post('/login', validateSchema(loginSchema),login)
router.post('/logout',logout)

router.get("/profile",authRequired,profile)

router.get("/verify", verifyToken);

module.exports= router
