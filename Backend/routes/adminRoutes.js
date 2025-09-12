import express from 'express'
import { adminLogin, approveCommentId, deleteCommentId, getAllBlogsAdmin, getAllComments, getDashboard } from '../controller/adminController.js'
import auth from "../midlleware/auth.js"

const adminRouter= express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.get('/comments', auth,getAllComments)
adminRouter.get('/blogs',auth,getAllBlogsAdmin)
adminRouter.post('/delete-comment',auth,deleteCommentId)
adminRouter.post('/approve-comment',auth,approveCommentId)
adminRouter.get('/dashboard',auth,getDashboard)


export default adminRouter