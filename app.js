import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import authRoute from "./Routes/AuthRoute.js";
import SuperAdminRoute from "./Routes/SuperAdmin.js";

const app = express()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)



app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))


app.get('/', (req, res) => {
    res.send('Hello from Express!')
})



app.use("/auth",authRoute)
app.use("/superAdmin",SuperAdminRoute)



// Error  🤦‍♂️🤦‍♂️


app.use((req, res) => {
    res.status(404).json({
        Error: "URL Not Found"
    })
})






export default app