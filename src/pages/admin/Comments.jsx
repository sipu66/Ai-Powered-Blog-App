import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')
  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-4 sm:pt-12 sm:px-8 bg-blue-50 min-h-screen'>
      
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-4xl mb-6'>
        <h1 className='text-2xl font-bold text-gray-700 mb-3 sm:mb-0'>Comments</h1>

        <div className='flex gap-3'>
          <button
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200
              ${filter === 'Approved' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-blue-50'}`}
            onClick={() => setFilter('Approved')}
          >
            Approved
          </button>

          <button
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200
              ${filter === 'Not Approved' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 hover:bg-red-50'}`}
            onClick={() => setFilter('Not Approved')}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Comments Table */}
      <div className='overflow-x-auto shadow rounded-lg bg-white'>
        <table className='w-full text-sm text-gray-600'>
          <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
            <tr>
              <th className='px-6 py-3 text-left'>Blog Title & Comment</th>
              <th className='px-6 py-3 text-left hidden sm:table-cell'>Date</th>
              <th className='px-6 py-3 text-left hidden sm:table-cell'>Action</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100'>
            {comments
              .filter(comment => comment.isApproved === (filter === 'Approved'))
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
