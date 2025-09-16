import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog
  const BlogDate = new Date(createdAt)
  const { axios } = useAppContext()

  const deleteItem = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { blogid: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Index */}
      <th className="px-4 py-3 text-gray-700 font-medium">{index}</th>

      {/* Blog Title + Status (for mobile) */}
      <td className="px-4 py-3 text-gray-800 whitespace-normal break-words">
        {title}
        {/* Show status under title on mobile */}
        <p
          className={`sm:hidden mt-1 text-sm ${
            blog.isPublished ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'
          }`}
        >
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      {/* Date (hidden on mobile) */}
      <td className="px-4 py-3 max-sm:hidden text-gray-600">
        {BlogDate.toDateString()}
      </td>

      {/* Status (hidden on mobile, since it's already shown under title) */}
      <td className="px-4 py-3 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'
          }`}
        >
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      {/* Action buttons */}
      <td className="px-4 py-3 flex items-center gap-3 text-sm">
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={togglePublish}
        >
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>

        <img
          onClick={deleteItem}
          src={assets.cross_icon}
          alt="delete"
          className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
        />
      </td>
    </tr>
  )
}

export default BlogTableItem
