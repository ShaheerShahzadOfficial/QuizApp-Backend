import express from "express"
import {  DeleteUser, GetAllUser, UpdateUser } from "../Controllers/SuperAdminController.js"
import { AuthenticatedUserRole, checkToken } from "../middleWare/auth.js"


const SuperAdminRoute = express.Router()


SuperAdminRoute.route("/allUser").get(checkToken, AuthenticatedUserRole("SuperAdmin"), GetAllUser)
SuperAdminRoute.route("/updateUser/:id").put(checkToken, AuthenticatedUserRole("SuperAdmin"), UpdateUser)
SuperAdminRoute.route("/deleteUser/:id").delete(checkToken, AuthenticatedUserRole("SuperAdmin"), DeleteUser)


export  default SuperAdminRoute
