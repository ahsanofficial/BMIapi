const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { User } = require("../models/User.model")

const signup = async (req, res) => {
    const { name, email, password } = req.body
    const isUser = await User.findOne({ email })
    if (isUser) {
        res.status(409).send({ "msg": "User already exists, try logging in" })
    }
    else {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(409).send({ msg: "Something went wrong, please try again later" })
            }
            const new_user = new User({
                name,
                email,
                password: hash
            })
            try {
                await new_user.save()
                res.status(200).send({ msg: "Sign up successfully" })
            }
            catch (err) {
                res.status(409).send({ msg: "Something went wrong, please try again" })
            }
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(409).send({ msg: "Please signup first" })
    }
    else {
        const hash = user.password;
        const user_id = user._id;
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                res.status(409).send({ msg: "Something went wrong, try again later" })
            }
            if (result) {
                const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
                res.status(200).send({ msg: "Login successfully", token })
            }
            else {
                res.status(409).send({ msg: "Invalid credentials, plz signup if you haven't" })
            }
        });
    }
}

const getProfile = async (req, res) => {
    console.log("🚀 ~ file: user.controller.js:58 ~ getProfile ~ req", req)
    const { user_id } = req.body
    const user = await User.findOne({ _id: user_id })
    const { name, email } = user
    res.send({ name, email })
}

module.exports = { signup, login, getProfile }