const express = require("express")
const dotenv = require("dotenv")
const dbConnection = require("./config/database")
const ordeRoute = require("./routes/orderRoute")
// create server using express
const app = express()

// allow us to access .env file content
dotenv.config({ path: "config.env" })
// connect to our db firs
dbConnection()

// middleware to read data comm's from body
app.use(express.json())

app.use("/api/v1/orders", ordeRoute)



app.listen(8001, () => {
    console.log("runing .");
})