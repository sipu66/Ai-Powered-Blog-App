import { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { marked } from 'marked'   // FIXED: use marked

const Addblog = () => {
  const {axios} = useAppContext()
  const[isAdding,setIsAdding] = useState(false)
  const[loading,setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image,setImage] = useState(null)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [category,setCategory] =useState('Startup')
  const[isPublished,setIsPublished] = useState(false)

  const generateContent = async()=>{
    if(!title) return toast.error('Please enter a title')
    setLoading(true)
    try {
      const {data}= await axios.post('/api/blog/generate',{prompt:title})
      if(data.success) {
        quillRef.current.root.innerHTML = marked(data.content)  // FIXED: use marked
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  } 

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    setIsAdding(true)
    try {
      const blog ={
        title,subTitle,
        description: quillRef.current.root.innerHTML,
        category,isPublished
      }
      const formData = new FormData();
      formData.append('blog',JSON.stringify(blog))
      formData.append('image',image)
      const{data}=await axios.post('/api/blog/add',formData)
      if(data.success) {
        toast.success(data.message)
        setImage(null)
        setTitle('')
        quillRef.current.root.innerHTML=''
        setCategory('Startup')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally{
      setIsAdding(false)
    }
  }
 
  useEffect(()=>{
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current,{theme:'snow'})
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={ !image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setTitle(e.target.value)} value={title} />

        <p className='mt-4'>Sub Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setSubTitle(e.target.value)} value={subTitle} />

           <p className='mt-4'>Blog Description</p>
<div className='max-w-lg min-h-[300px] max-h-[400px] pb-16 sm:pb-10 pt-2 relative border border-gray-300 rounded overflow-hidden'>
  <div 
    ref={editorRef} 
    className={`min-h-[250px] max-h-[350px] overflow-y-auto pr-2 ${loading ? 'pointer-events-none' : ''}`}
  ></div>

          {loading && (
            <div className='absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10 rounded'>
              <div className='flex flex-col items-center gap-2'>
                <div className='w-8 h-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin'></div>
                <span className='text-sm text-gray-600'>Generating content...</span>
              </div>
            </div>
          )}
          <button 
            type='button' 
            disabled={loading} 
            onClick={generateContent} 
            className='absolute bottom-2 right-2 z-20 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value=""> Select category </option>
          {blogCategories.map((item,index)=> <option key={index} value={item}>{item}</option>)}
        </select>

        <div className='flex gap-2 mt-4'>Publish Now
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e=> setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-50'>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default Addblog