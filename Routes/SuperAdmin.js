import express from "express"
import { AllowUsertoAtemptQuiz, DeleteUser, GetAllUser, UpdateUserRole } from "../Controllers/SuperAdminController.js"
import { AuthenticatedUserRole, checkToken } from "../middleWare/auth.js"


const SuperAdminRoute = express.Router()


SuperAdminRoute.route("/allUser").get(checkToken, AuthenticatedUserRole("SuperAdmin"), GetAllUser)
SuperAdminRoute.route("/updateRole/:id").put(checkToken, AuthenticatedUserRole("SuperAdmin"), UpdateUserRole)
SuperAdminRoute.route("/deleteUser/:id").delete(checkToken, AuthenticatedUserRole("SuperAdmin"), DeleteUser)
SuperAdminRoute.route("/allowUser/:id").put(checkToken, AuthenticatedUserRole("SuperAdmin"), AllowUsertoAtemptQuiz)


export  default SuperAdminRoute
