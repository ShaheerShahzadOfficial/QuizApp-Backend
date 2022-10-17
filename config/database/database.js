import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DBConnection = () => {
     const url = process.env.DB_URI
    mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
        console.log(`DATABASE CONNECTED with ${result.connection.host}`)
    })
}

export default DBConnection