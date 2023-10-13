import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/constants';
import Layout from '../components/Layout';
import contactListApi from "../api/contactListApi";
import getChatMessages from "../api/getChatMessagesApi";
import messageSeenApi from "../api/messageSeenApi";
// import createChatRoomApi from '../api/createChatRoomApi'

const MessagePage = () => {

    const { user, isAuthenticated } = useSelector(state => state.user);
    const [profiles, setProfiles] = useState([]);
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [bg, setBg] = useState(false);
    const [dpChat, setDpChat] = useState(null);
    const navigate = useNavigate();

    
    useEffect(()=>{
      const fetchData = async () => {
        try {
              const result = await contactListApi();
              setProfiles(result);
            } catch (error) {
              console.error(error);
            }
          };
          if (user) {
            fetchData();
          }
    },[user]);

    useEffect(() => {
      if (ws) {
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
          };
        }
      }, [ws]);
      
    const ref = useChatScroll(messages)

    function useChatScroll(dep) {
      const ref = useRef();
      useEffect(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }, [dep]);
      return ref;
    }

    const handleSendMessage = () => {
        if (ws && inputMessage.trim() !== "") {
          ws.send(JSON.stringify({ message: inputMessage }));
          setInputMessage("");
        }
      };

      const joinChatroom = async (chatroomId, userId , dp_image) => {
        try {
          setBg(true);
          setDpChat(dp_image);
          // await createChatRoomApi(userId);

          const accessToken = localStorage.getItem("access_token");
          const websocketProtocol =  window.location.protocol === "https:" ? "wss://" : "ws://";
          // const wsUrl = `${websocketProtocol}${window.location.host}/ws/chat/${chatroomId}/?token=${accessToken}`;
          const wsUrl = `${websocketProtocol}127.0.0.1:8000/ws/chat/${chatroomId}/?token=${accessToken}`;
          const newChatWs = new WebSocket(wsUrl);

          newChatWs.onopen = async () => {
            console.log("Chatroom WebSocket connection opened.");
            // Fetch previous messages when the WebSocket connection is opened
            const previousMessages = await getChatMessages(chatroomId);
            setMessages(previousMessages);
            await messageSeenApi(userId);
            setProfiles((prevProfiles) => {
                return prevProfiles.map((profile) => {
                  if (profile.id === chatroomId) {
                    // Set unseen_message_count to zero
                    return { ...profile, unseen_message_count: 0 };
                  }
                  return profile;
                });
              });
            };
            newChatWs.onclose = () => {
                console.log("Chatroom WebSocket connection closed.");
                // You can perform any necessary cleanup here when the WebSocket connection is closed.
              };
            newChatWs.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log(message);
                // Handle incoming messages from the chatroom WebSocket
              };

            setWs(newChatWs);
    } catch (error) {
      console.error(error);
    }
  };


    if (!isAuthenticated) {
        navigate('/');
    };

  return (
    <Layout title="Postbox | Chats" content="Messages">
        <div className="flex h-screen  p-2">
        <div className="flex flex-col flex-grow w-3/5 mt-20 p-1 m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.27),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-lg overflow-hidden">
          {bg ? (
            <div ref={ref} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {messages?.map((message, index) =>
                message?.sender_email === user.email ? (
                  <div
                    key={index}
                    className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  >
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">
                          {message.message ? message.message : message.text}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {message.created} ago
                      </span>
                    </div>
                    <img
                      className="flex-shrink-0 h-10 w-10 rounded-full"
                      src={`${BASE_URL}${user?.display_pic}`}
                      alt="user"
                    />
                  </div>
                ) : (
                  <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
                    <img
                      className="flex-shrink-0 h-10 w-10 rounded-full"
                      src={`${BASE_URL}`+dpChat}
                      alt="user"
                    />
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">
                          {message.message ? message.message : message.text}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {message.created} ago
                      </span>
                    </div>
                  </div>
                )
              )}
              <div className="flex-grow"></div>
              <div className="bg-[#c2c2c2] p-4 rounded-xl">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-[#4b2848] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    aria-describedby="button-addon1"
                  />
                  <button
                    className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#4b2848] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    onClick={handleSendMessage}
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-grow p-4 overflow-auto">
              <p className="mx-auto my-auto ">Select person to start messaging</p>
            </div>
          )}
        </div>
        <div className="w-2/5 mt-20 p-1 m-2 overflow-y-auto bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.27),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          {profiles ? (
            profiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => joinChatroom(profile.id, profile.members[0].id, profile.members[0].display_pic)}
                className="relative flex items-center rounded-lg m-1 cursor-pointer bg-gray-300 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
              >
                {profile.unseen_message_count > 0 && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-full">
                    {profile.unseen_message_count}
                  </div>
                )}

                <img
                  className="w-14 rounded-full h-14  mr-2"
                  src={BASE_URL + profile.members[0].display_pic}
                  alt="profile"
                />
                <div className="flex-grow">
                  <h5 className="mb-1 text-sm font-medium leading-tight text-neutral-800 text-start">
                    {profile.members[0].username}
                  </h5>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default MessagePage
