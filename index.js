const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { router } = require("./routes/routes")
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello")
})
app.use("/", router)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})