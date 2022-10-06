import http from "http"
import app from "./app.js";
import dotenv, { config } from "dotenv"
import DBConnection from "./config/database/database.js"
const Server = http.createServer(app)

// config
dotenv.config({path:"config/config.env"})


DBConnection()



const port = process.env.PORT || 4000
Server.listen(port, () => {
    console.log(`Server is Running On ${port}`)
})