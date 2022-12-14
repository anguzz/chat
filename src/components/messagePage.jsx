import React, { useEffect, useRef, useState } from 'react';
import { client } from '../utils/config';



const refreshPage = ()=>{
  window.location.reload();
}

const MessagePage = () => {
  const [msgLog, setLog] = useState([]);
  const [msg, setMessage] = useState({msg: '',});
  const [error, setError] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    client.realtime.subscribe('messageCollection', function (e) 
    {
      let i = msgLog.filter((item) => item.id !== e.record.id);
      setLog([e.record, ...i]);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

const Msg = ({item}) => {
  return (
    <div class="chat-message">
         <div class="flex items justify">
            <div class="flex flex-col space-y-2 text-xl max-w-m mx-2 order-1 items-end">
               <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white ">{item.msg}</span></div>
            </div>
         </div>
      </div>
  );
};

 const updateMsg = async ({ rec_id, data }) => {
    try {
      await client.records.update('messageCollection', rec_id, data);
    } catch (error) {
      console.log('Error occurred updating message', error);
    }
  };
  useEffect(() => {
    getLog();
  }, []);


 const createMsg = async () => {
    try {
      await client.records.create('messageCollection', msg);
      refreshPage(); 
    } catch (error) {
      setError(error.data.data.msg.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    ref.current.value = '';
    msg.message = '';
  };


  const getLog = async () => {
    try {
      const records = await client.records.getFullList('messageCollection', 20, {
        //sort: '-created', will inverse messages so latest is at top
      });
      setLog(records);
    } catch (error) {
      console.log('Error fetching messages', error);
    }
  };


 

  return (
    <div className="border w-[screen] h-screen relative bg-gray-200">
      <div class="relative flex items-center space-x-4">
         <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
               <span class="text-gray-700 mr-3">Group Chat</span>
            </div>
         </div>
      </div>
      <div className="flex flex-col space-y-2  py-2 px-2 max-h-[80%] overflow-y-scroll">
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
        {/* <input
          type="text"
          placeholder="message"
          className="border p-2 w-full rounded-lg bg-white text-gray-700 placeholder-gray-500"
          onChange={(e) => setMessage({ ...msg, msg: e.target.value })}
          ref={ref}
        /> */}
        {/* <p className="text-red-500 leading-none">{error.length > 0 && error}</p> */}
        {/* <button
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
          onClick={createMsg}
        >
          send
        </button> */}

        <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div class="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
              onChange={(e) => setMessage({ ...msg, msg: e.target.value })}
              ref={ref}
            />
            <p className="text-red-500 leading-none">{error.length > 0 && error}</p>
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={createMsg}
              >
                <span class="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};



export default MessagePage;
