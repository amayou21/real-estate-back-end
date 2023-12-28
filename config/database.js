const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL).then(
        (conn) => { console.log(`connected successfuly to db: ${conn.connection.host}`); }
    ).catch(
        (err) => { console.log(err); }
    )
}
module.exports = dbConnection