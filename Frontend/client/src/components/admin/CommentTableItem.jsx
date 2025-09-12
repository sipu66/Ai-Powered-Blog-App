import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt } = comment
  const BlogDate = new Date(createdAt)
  const { axios } = useAppContext()

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { Id: comment._id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async () => {
    const confirm = window.confirm('Are you sure want to delete this comment?')
    if (!confirm) return
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { Id: comment._id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-600 mb-1">Blog:</p>
        <p className="text-gray-700">{blog?.title || 'No title'}</p>
        <p className="font-medium text-gray-600 mt-2">Name:</p>
        <p className="text-gray-700">{comment.name}</p>
        <p className="font-medium text-gray-600 mt-2">Comment:</p>
        <p className="text-gray-700">{comment.content}</p>
      </td>
      <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <span className="text-xs border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1">
              Approved
            </span>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
