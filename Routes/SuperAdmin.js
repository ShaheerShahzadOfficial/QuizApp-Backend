import express from 'express'
import {
  DeleteUser,
  GetAllUser,
  UpdateUser,
  AddEntryKey,
  DeleteKey,
  EditKey,
  getKey,
} from '../Controllers/SuperAdminController.js'
import { AuthenticatedUserRole, checkToken } from '../middleWare/auth.js'

const SuperAdminRoute = express.Router()

SuperAdminRoute.route('/allUser').get(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  GetAllUser,
)
SuperAdminRoute.route('/updateUser/:id').put(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  UpdateUser,
)
SuperAdminRoute.route('/deleteUser/:id').delete(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  DeleteUser,
)

SuperAdminRoute.route('/AddKey').post(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  AddEntryKey,
)
SuperAdminRoute.route('/deleteKey/:id').delete(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  DeleteKey,
)
SuperAdminRoute.route('/editKey/:id').put(
  checkToken,
  AuthenticatedUserRole('SuperAdmin'),
  EditKey,
)

SuperAdminRoute.route('/getKey').put(checkToken, getKey)

export default SuperAdminRoute
