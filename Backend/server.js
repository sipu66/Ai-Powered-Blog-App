import express from 'express'
import 'dotenv/config'
import  cors from 'cors'
import { connectDB } from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'
const app = express()


app.use(express.json())
app.use(cors())

 connectDB()
 app.use('/api/admin',adminRouter)
 app.use('/api/blog',blogRouter)

 app.use('/',(req,res)=>{
    res.send('port ias working fine')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000,()=>{
    console.log(`server running on ${PORT}`)
    
})