import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { client } from '../utils/config'

function LoginPage () {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    client
      .collection('users')
      .authWithPassword(`${username}`, `${password}`)
      .then((result) => {
        if (result) {
          navigate('/messagePage')
        }
      })
  }
  return (
    <div className='flex justify-center items-center border w-[screen] h-screen relative'>
      <div>
        <div>
          <h1 className='text-4xl font-semibold text-white flex justify-center'>
            Login
          </h1>
        </div>
        <div className='flex flex-1 bg-neutral-600 rounded-lg m-5'>
          <form className='flex flex-col gap-5 m-11' onSubmit={handleSubmit}>
            <input
              className='rounded-md'
              type='text'
              name='username'
              placeholder='Your username'
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              className='rounded-md'
              type='text'
              name='password'
              placeholder='Your password'
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              className=' rounded-md text-2xl font-semibold bg-white'
              type='submit'
              value='Enter'
            />
          </form>
        </div>
        <Link to='/' className='flex justify-center text-white' href=''>
          Return to Landing
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
