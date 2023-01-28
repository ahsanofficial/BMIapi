const { Router } = require("express")
const router = Router();
const { signup, login, getProfile } = require("../controllers/user.controller")
const { calculateBMI, getCalculation } = require("../controllers/bmi.controller")
const { authentication } = require("../middlewares/authentication")

router.post("/signup", signup)
router.post("/login", login)
router.get("/getProfile", authentication, getProfile)
router.post("/calculateBMI", authentication, calculateBMI)
router.get("/getCalculation", authentication, getCalculation)

module.exports = { router }