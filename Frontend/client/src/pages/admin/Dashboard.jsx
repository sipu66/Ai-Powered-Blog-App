import { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'


const Dashboard = () => {
  const [dashBoardData,setdashBoardData] = useState({
    blogs:0,
    comments:0,
    drafts:0,
    recentBlogs:[]
  })
  const {axios} = useAppContext();
  const fetchDashboard = async()=>{
   try {
    const {data} = await axios.get('/api/admin/dashboard')
    data.success? setdashBoardData(data.dashboardData) : toast.error(data.message)
   } catch (error) {
    toast.error(error.message)
   }
  }
  useEffect(()=>{
    fetchDashboard()
  },[])
  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 min-h-[calc(100vh-70px)]'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-50 rounded
           shadow cursor-pointer hover:scale-105 transition-all'>
           <img src={assets.dashboard_icon_1} alt="" />
           <div>
            <p className='text-xl font-semibold text-gray-500'>{dashBoardData.blogs}</p>
            <p className='text-gray-500 font-light'>Blogs</p>
           </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-50 rounded
           shadow cursor-pointer hover:scale-105 transition-all'>
           <img src={assets.dashboard_icon_2} alt="" />
           <div>
            <p className='text-xl font-semibold text-gray-500'>{dashBoardData.comments}</p>
            <p className='text-gray-500 font-light'>Comments</p>
           </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-50 rounded
           shadow cursor-pointer hover:scale-105 transition-all'>
           <img src={assets.dashboard_icon_3} alt="" />
           <div>
            <p className='text-xl font-semibold text-gray-500'>{dashBoardData.drafts}</p>
            <p className='text-gray-500 font-light'>Drafts</p>
           </div>
        </div>

      </div>
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-500 '>
          <img src={assets.dashboard_icon_4} alt="" />
          <p >Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg
        scrollbar-hide bg-white'>
          <table className="w-full text-sm text-gray-500">

            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr >
                <th scope='col' className='px-2 py-4  xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden '>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
                 {dashBoardData.recentBlogs.map((blog,index)=>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1}/>
                 })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
