
import React from 'react';
import { assets } from '../assets/assets';

import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  
  const {navigate,token} = useAppContext()
  console.log("navigate:", navigate);

  return (
    <div className="bg-white flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer focus:outline-none active:outline-none"
        style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
      >
        <img
       
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 relative -top-6 -left-10 select-none"
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          draggable="false"
        />
      </div>

      {/* Login Button */}
      <button
  onClick={() => navigate('/admin')}
  className="flex items-center gap-2 rounded-full text-sm bg-primary text-white px-10 py-2.5 relative -top-7 cursor-pointer focus:outline-none active:outline-none hover:opacity-90 transition-opacity"
  style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
>
  {token ? 'Dashboard' : 'Login'}
  <img
    src={assets.arrow}
    alt="arrow"
    className="w-3 select-none"
    draggable="false"
  />
</button>

    </div>
  );
};


export default Navbar;