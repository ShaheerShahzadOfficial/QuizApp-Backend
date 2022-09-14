import express from "express"

import {RegisterUser,Login, Logout} from "../Controllers/AuthController.js"

const authRoute = express.Router()

authRoute.route("/register").post(RegisterUser)
authRoute.route("/Login").post(Login)
authRoute.route("/logout").delete(Logout)

export default authRoute