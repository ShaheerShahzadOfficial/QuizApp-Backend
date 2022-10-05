import express from "express"

import {RegisterUser,Login, Logout, GetUserDetail} from "../Controllers/AuthController.js"
import { checkToken } from "../middleWare/auth.js"

const authRoute = express.Router()

authRoute.route("/register").post(RegisterUser)
authRoute.route("/Login").post(Login)
authRoute.route("/logout").delete(Logout)
authRoute.route("/userDetails").get(checkToken, GetUserDetail)
export default authRoute