const express = require("express")
const dotenv = require("dotenv")
const dbConnection = require("./config/database")
const ordeRoute = require("./routes/orderRoute")
const landsRoute = require("./routes/landRoute")
const globalError = require("./middleware/globallError")
const ApiError = require("./utility/apiError")
// create server using express
const app = express()

// allow us to access .env file content
dotenv.config({ path: "config.env" })
// connect to our db firs
dbConnection()

// middleware to read data comm's from body
app.use(express.json())


app.use("/api/v1/orders", ordeRoute)
app.use("/api/v1/lands", landsRoute)

app.all("*", (req, res, next) => {
    next(new ApiError(`can't find this rout : ${req.originalUrl}`, 404))
})

app.use(globalError)

app.listen(8001, () => {
    console.log("runing .");
})