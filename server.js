const path = require("path");
const express = require("express")
const dotenv = require("dotenv")
const dbConnection = require("./config/database")
const ordeRoute = require("./routes/orderRoute")
const landsRoute = require("./routes/landRoute")
const homeRoute = require("./routes/homeRoute")
const categoryRoute = require("./routes/categoryRoute")
const globalError = require("./middleware/globallError")
const ApiError = require("./utility/apiError")
const cors = require("cors")
// create server using express
const app = express()

// allow us to access .env file content
dotenv.config({ path: "config.env" })
// connect to our db firs
dbConnection()

// middleware to read data comm's from body
app.use(express.json());
// Allow requests from a specific origin (http://localhost:3000 in this case)
const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/orders", ordeRoute)
app.use("/api/v1/lands", landsRoute)
app.use("/api/v1/homes", homeRoute)
app.use("/api/v1/categories", categoryRoute)

app.all("*", (req, res, next) => {
    next(new ApiError(`can't find this rout : ${req.originalUrl}`, 404))
})

app.use(globalError)



const server = app.listen(process.env.PORT, () => {
    console.log(`App Runing on port ${process.env.PORT}`);
});


// @desc   handle rejections outside express
process.on("unhandledRejection", (err) => {
    console.log(`unhandledRejection : ${err.name} || ${err.message}`);
    server.close(() => {
        console.log("shuting down...");
        process.exit(1);
    });
});