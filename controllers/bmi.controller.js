require("dotenv").config()
const { BMIModel } = require("../models/BMI.model")

const calculateBMI = async (req, res) => {
    const { height, weight, user_id } = req.body;
    const height_in_metre = Number(height) * 0.3048
    const BMI = Number(weight) / (height_in_metre) ** 2
    const new_bmi = new BMIModel({
        BMI,
        height: height_in_metre,
        weight,
        user_id
    })
    await new_bmi.save()
    res.send({ BMI })
}

const getCalculation = async (req, res) => {
    const { user_id } = req.body;
    const all_bmi = await BMIModel.find({ user_id: user_id })
    res.send({ history: all_bmi })
}

module.exports = { calculateBMI, getCalculation }