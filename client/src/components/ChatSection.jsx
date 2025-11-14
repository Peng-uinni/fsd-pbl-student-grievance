import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ChatSection({complaintId}){
  const endpoint = 'http://localhost:8080/api/chat/complaint/'+complaintId;
  const [chatLogs, setChatLogs] = useState([]);
  const [message, setMessage] = useState('');

  const {email, name, role} = useContext(AuthContext);

  const getLogs = async () => {
    try{
      const res = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      })

      const data = await res.json();

      if(res.ok && data.success){
        setChatLogs(data.body);
      }
    } catch(err){
      console.error(err);
    }
  }

  const sendMessage = async () => {
    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email: email,
          role: role,
          message: message,
        })
      })

      const data = await res.json();

      if(res.ok && data.success){
        getLogs();
        setMessage('');
      }
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' });
  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        Conversation History ({chatLogs.length})
      </h3>

      {/* Message Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {chatLogs.length === 0 ? (
          <p className="text-gray-500 text-sm italic p-3 text-center">No messages yet. Start the conversation!</p>
        ) : (
          chatLogs.map((msg, key) => {
            // Determine if the message is from the user or an agent/admin (for styling)
            const isSender = msg.email === email; // simplified check
            
            return (
              <div  
                key={key}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-lg shadow-md ${
                    isSender 
                      ? 'bg-indigo-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 opacity-80">
                    Anon
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  <span className={`block text-right mt-1 text-xs ${isSender ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Message Input Area */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-3">
        <input type="text" onChange={(e) => {setMessage(e.target.value)}} value={message} placeholder="Type here"/>
        <button
          className="self-end px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}