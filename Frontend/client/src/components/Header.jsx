import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const {setInput,input}=useAppContext()
    const inputRef = useRef()
    const onSubmitHandler = async(e)=>{
          e.preventDefault();
          setInput(inputRef.current.value)
    }

     const onClear =()=>{
        setInput('')
        inputRef.current.value=''
     }
  return (
    <div className='relative mx-8 sm:mx-16 xl:mx-24'>
        {/* Badge */}
        <div className='flex justify-center mt-10 sm:mt-12 mb-4'>
            <div className='inline-flex items-center gap-4 px-6 py-1.5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI feature integrated</p>
                <img src={assets.star_icon} className='w-2.5' alt="star" />
            </div>
        </div>

        {/* Heading */}
        <h1 className='text-3xl sm:text-5xl font-semibold sm:leading-tight text-gray-700 text-center mt-4'>
            Your personal <span className='text-primary'>AI-powered</span> <br />
            blogging platform.
        </h1>

        {/* Paragraph */}
        <p className='my-4 sm:my-6 max-w-2xl mx-auto text-center text-gray-500'>
            Your personal AI writing assistant is here. Transform your ideas into high-quality blog posts effortlessly. 
            Whether you're sharing tips, stories, or insights, our platform helps you create, edit, and publish with ease.
        </p>

        {/* Search Bar */}
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden mt-6'>
            <input 
            ref={inputRef}
                type="text" 
                placeholder='Search for blogs' 
                required 
                className='bg-white w-full pl-4 focus:outline-none active:outline-none' 
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
            />
            <button 
                type='submit' 
                className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer focus:outline-none active:outline-none'
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
            >
                Search
            </button>
        </form>

       <div className='text-center'>
        {input &&  <button  onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer mt-4 '>Clear Search</button>}
       </div>
        <img 
            src={assets.gradientBackground} 
            alt="background" 
            className='absolute top-0 left-0 w-full z-[-10] opacity-50'
        />
    </div>
  );
};
export default Header;