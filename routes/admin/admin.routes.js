import express from 'express'
import { loginAdmin, registerAdmin } from '../../controllers/admin/admin.Controller.js'
import { verifyAdminAuth } from '../../middlewares/admin/verifyAdminAuth.js'

export const AdminRouter = express.Router()

AdminRouter.post('/register',registerAdmin)
AdminRouter.post('/login',loginAdmin)
AdminRouter.get('/test',verifyAdminAuth,()=>{
    console.log("Test route works")
})