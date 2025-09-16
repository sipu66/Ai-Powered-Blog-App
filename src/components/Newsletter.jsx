import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 my-16">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-4">
        Subscribe to get the latest blogs, new tech, and exclusive news
      </p>

      <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 w-full"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 rounded-md bg-primary/80 text-white hover:bg-primary transition-all cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter

