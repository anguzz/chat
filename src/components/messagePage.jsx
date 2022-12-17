import React, { useEffect, useRef, useState } from 'react'
import { client } from '../utils/config'
import { useNavigate } from 'react-router-dom'

const refreshPage = () => {
  window.location.reload()
}

const MessagePage = () => {
  const [msgLog, setLog] = useState([])
  const [msg, setMessage] = useState({ msg: '' })
  const [error, setError] = useState('')
  const ref = useRef(null)
  const loggedIn = window.localStorage.getItem('pocketbase_auth')
  const navigate = useNavigate()
  useEffect(() => {
    if (!loggedIn) navigate('/landingPage')
  })

  // useEffect(() => {
  //   client.collection('messageCollection').subscribe('*', function (e) {
  //     let i = msgLog.filter((item) => item.id !== e.record.id)
  //     setLog([e.record, ...i])
  //   })
  //   return () => {
  //     client.collection('messageCollection').unsubscribe()
  //   }
  // })
  client.collection('messageCollection').subscribe('*', function (e) {
    // let i = msgLog.filter((item) => item.id !== e.record.id)
    // setLog([e.record, ...i])
    refreshPage()
  })

  const Msg = ({ item }) => {
    const date = new Date(item.created).toDateString()
    if (item.userName === client.authStore.model.username) {
      return (
        <div>
          <div className="float-right bg-blue-600 p-2 rounded-lg rounded-br-none">
            <p className="text-white text-lg text-right">{item.msg}</p>
            <p className="text-white text-xs text-right">{date}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="chat-message">
          <div className="float-left bg-blue-600 p-2 rounded-lg rounded-bl-none">
            <p className="text-white text-lg text-left">{item.msg}</p>
            <p className="text-white text-xs  text-left">
              posted by: {item.userName} {date}
            </p>
          </div>
        </div>
      )
    }
  }

  const updateMsg = async ({ rec_id, data }) => {
    try {
      await client.collection('messageCollection').update(rec_id, data)
    } catch (error) {
      console.log('Error occurred updating message', error)
    }
  }

  useEffect(() => {
    getLog()
  }, [])

  const createMsg = async () => {
    try {
      const data = {
        msg: `${msg.msg}`,
        userName: `${client.authStore.model.username}`,
      }
      await client.collection('messageCollection').create(data)
      refreshPage()
    } catch (error) {
      console.log(error)
      setError(error.data.data.msg.message)
      setTimeout(() => {
        setError('')
      }, 2000)
    }
    ref.current.value = ''
    msg.message = ''
  }

  const getLog = async () => {
    try {
      const records = await client
        .collection('messageCollection')
        .getFullList(200, {})
      setLog(records)
    } catch (error) {
      if (!error.name === 'ClientResponseError 0') {
        console.log('Error fetching messages', error)
      }
    }
  }

  return (
    <div className="h-screen border w-[screen] relative bg-slate-800">
      <div className="py-2 px-3.5">
        <h1 className="text-2xl font-semibold text-white">Group Chat</h1>
      </div>
      <div className="flex flex-col space-y-2  py-2 px-2 max-h-[80%] overflow-y-auto">
        {msgLog.length > 0 ? (
          msgLog.map((msg) => (
            <Msg
              key={msg.id}
              item={msg}
              msgLog={msgLog}
              setLog={setLog}
              msg={msg}
              updateMsg={updateMsg}
            />
          ))
        ) : (
          <p className="text-2xl font-semibold text-white">No messages</p>
        )}
      </div>
      <div className="p-2 absolute w-full bottom-1 space-y-2">
        <input
          type="text"
          placeholder="message"
          className="border p-2 w-full rounded-lg bg-white text-gray-700 placeholder-gray-500"
          onChange={(e) => setMessage({ ...msg, msg: e.target.value })}
          ref={ref}
        />
        <p className="text-red-500 leading-none">{error.length > 0 && error}</p>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
          onClick={createMsg}
        >
          send
        </button>
      </div>
    </div>
  )
}

export default MessagePage
