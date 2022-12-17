import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage () {
  return (
    <div className='border w-[screen] h-screen relative'>
      <div className='flex justify-center py-2 px-3.5 mt-5'>
        <h1 className='text-5xl font-semibold text-white'>Group Chat</h1>
      </div>
      <div className=' flex justify-center mt-10'>
        <img
          src={require('./ChatPreview.png')}
          alt='Chat app preview'
          className='text-2xl font-semibold text-white w-2/3 rounded-lg'
        />
      </div>
      <nav className='flex justify-center mt-20 gap-10'>
        <Link
          to='/registerPage'
          className='text-2xl font-semibold text-white bg-neutral-600 p-5 rounded-lg'
        >
          Register
        </Link>
        <Link
          to='/loginPage'
          className='text-2xl font-semibold text-white bg-neutral-600 p-5 rounded-lg'
        >
          Login
        </Link>
      </nav>
    </div>
  )
}

export default LandingPage
