import React, { useState } from 'react';
import { blog_data, blogCategories } from '../assets/assets';
import Blogcard from './Blogcard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const {blogs,input} = useAppContext()
  
  const filterBlogs=()=>{
    if(input===""){
      return blogs
    }
    
   return blogs.filter((blog)=>{
     return blog.title.toLowerCase().includes(input.toLowerCase())|| blog.category.toLowerCase().includes(input.toLowerCase()
    )
    console.log(blog)
    })
  }
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10'>
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`relative px-4 py-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none active:outline-none ${
              activeCategory === item
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-500 hover:bg-primary/20'
            }`}
            style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mp-24 mx-8 sm:mx-16 xl:mx-40'>
        {filterBlogs()
  .filter((blog) => activeCategory === "All" || blog.category === activeCategory)
  .map((blog) => <Blogcard key={blog._id} blog={blog} />)}

      </div>
    </div>
  );
};

export default BlogList;