import React, { useState } from 'react'
import { client } from '../utils/config'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage () {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: `${username}`,
      email: `${email}`,
      emailVisibility: true,
      password: `${password}`,
      passwordConfirm: `${password}`,
      name: ''
    }
    client
      .collection('users')
      .create(data)
      .then((result) => {
        if (result) {
          client.authStore.save()
          navigate('/messagePage')
        }
      })
  }

  return (
    <div className='flex justify-center items-center border w-[screen] h-screen relative'>
      <div>
        <div>
          <h1 className='text-4xl font-semibold text-white flex justify-center'>
            Register
          </h1>
        </div>
        <div className='flex flex-1 bg-neutral-600 rounded-lg m-5'>
          <form className='flex flex-col gap-5 m-11' onSubmit={handleSubmit}>
            <input
              className='rounded-md'
              type='text'
              name='email'
              placeholder='Your email'
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              className='rounded-md'
              type='text'
              name='username'
              placeholder='Your username'
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              className='rounded-md'
              type='password'
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
