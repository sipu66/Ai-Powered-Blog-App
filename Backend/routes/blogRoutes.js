import express from "express"

import { addBlog, addCommment, deleteBlogId, getAllBlogs, getBlogById, togglePublish,getBlogComment, generateContent } from "../controller/blogController.js";
import auth from "../midlleware/auth.js";
import upload from "../midlleware/multer.js";



const blogRouter = express.Router()
blogRouter.post('/add', auth,upload.single('image'), addBlog)
blogRouter.get('/all',getAllBlogs)
blogRouter.get('/:blogId',getBlogById)
blogRouter.post('/delete',auth,deleteBlogId)
blogRouter.post('/toggle-publish',auth,togglePublish)
blogRouter.post('/add-comment',addCommment)
blogRouter.post('/comments', getBlogComment)
blogRouter.post('/generate',auth,generateContent)


export default blogRouter