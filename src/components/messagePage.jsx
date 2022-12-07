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
      <div className="flex items-center space-x-2 bg-blue-600 px-3 py-2 rounded-lg">
        <p className={`text-white text-lg  leading-none`}>{item.msg}</p>
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
    <div className="border w-[screen] h-screen relative bg-slate-800">
      <div className="py-2 px-3.5">
        <h1 className="text-2xl font-semibold text-white">Group Chat</h1>
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
        <input type="text" placeholder="message" className="border p-2 w-full rounded-lg bg-white text-gray-700 placeholder-gray-500"
          onChange={(e) =>setMessage({...msg,msg: e.target.value,})}ref={ref}/>
        <p className="text-red-500 leading-none">{error.length > 0 && error}</p>
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full"onClick={createMsg}>
          send
        </button>
      </div>
    </div>
  );
};



export default MessagePage;
