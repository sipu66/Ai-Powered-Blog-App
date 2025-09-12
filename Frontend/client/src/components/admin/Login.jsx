import React from 'react'
import {useState} from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
const Login = () => {
  const{axios,setToken} = useAppContext()
  const [email,setEmail]= useState("")
  const[password,setPassword] = useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
       const {data} =  await axios.post('/api/admin/login',{email,password})
       if(data.success) {
        setToken(data.token)
        localStorage.setItem('token',data.token)
         axios.defaults.headers.common['Authorization'] = data.token
       } else {
        toast.error(data.message)
       }
      
       
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Smaller card */}
      <div className="w-[320px] p-6 border border-primary/30 shadow-md rounded-lg bg-white">
        <div className="flex flex-col items-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-xl font-semibold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="text-sm text-gray-500">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form  onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600' action="">
            <div className='flex flex-col'>
              <label>Email</label>
              <input type="Email" onChange={(e)=>setEmail(e.target.value)} value={email} required placeholder='Enter your Email' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
             <div className='flex flex-col'>
              <label>Password</label>
              <input type="Password" onChange={(e)=>setPassword(e.target.value)} value={password} required placeholder='Enter your Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <button className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90
            transition-all'>Login </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
