

import fs from "fs"
import imagekit from "../configs/imagekit.js"
import Blog from "../models/Blog.js"
import Comment from "../models/comment.js"
import main from "../configs/gemini.js"
export const    addBlog =async(req,res)=>{
try {
     const{title,subTitle,description,category,isPublished} =JSON.parse(req.body.blog)
     const imageFile = req.file

     if(!title || !description || !category || !imageFile ) {
        return res.json({sucess: false,message:"missing required fields"})
     }
        const fileBuffer =fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder: "/blogs"
        })
        
        const optimizedImageUrl = imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:"auto"},
                {format:"webp"},
                {width:'1280'}
            ]
        })
        const image = optimizedImageUrl
        await Blog.create({title,subTitle,description,category, image ,isPublished})
        res.json({success:true,message:'Blog Added sucessfully'})

} catch (error) {
    res.json({success:false,message:error.message})
}
}

 export  const getAllBlogs =async(req,res)=>{
    try {
         const blogs = await Blog.find({isPublished:true})
         res.json({success:true,blogs})
    } catch (error) {
         res.json({success:false,message:error.message})
        
    }
 }

 export const getBlogById = async(req,res)=>{
      
    try {
        const {blogId} = req.params
        console.log(blogId)
        const blog = await Blog.findById(blogId)
        if(!blog) {
            return res.json({success:false,message:"error blog not found"})
        }
        res.json({success:true,blog})
    } catch (error) {
         return res.json({success:false,message:error.message})
    }
 }
 
 export const deleteBlogId = async(req,res)=>{
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)
        //delete all comment with that blog
        await Comment.deleteMany({blog:id})
        res.json({success:true,message:"Blog deleted successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
 }

export const togglePublish = async (req, res) => {
  try {
    const { blogid } = req.body;

    if (!blogid) {
      return res.status(400).json({ success: false, message: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: blog.isPublished ? "Blog published" : "Blog unpublished",
      blog,
    });
  } catch (error) {
    console.error("Toggle publish error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


 export  const addCommment=async(req,res)=>{
    try {
        const {blog,name,content}=req.body;
        await Comment.create({blog,name,content})
        res.json({success:true,message:"comment added for review"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

 }

 export const getBlogComment=async(req,res)=>{
    try {
        const {blogId}=req.body;
        const comments = await Comment.find({blog:blogId, isApproved:true}).sort({createdAt:-1})
        res.json({success:true,comments})
    } catch (error) {
         res.json({success:false,message:error.message})
    }
 }
export const generateContent = async(req,res)=>{
 try {
    const{prompt} =req.body
   const content =  await main(prompt+'Generate a blog coontent for this topic in simple text format')
   res.json({success:true,content})

 } catch (error) {
   res.json({success:false, message:error.message})
 }
}