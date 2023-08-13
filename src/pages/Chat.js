import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import style from "./Chat.module.css"
import { allUsersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  
  const [cookies] = useCookies(['user']);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    if (cookies.user) {
      socket.current = io(host);
      socket.current.emit("add-user", cookies.user._id);
    }
  }, [cookies.user]);

  useEffect(() => {
    if (cookies.user) {
      if (cookies.user.isAvatarImageSet) {
        async function fetchData() {
          const data = await axios.get(`${allUsersRoute}/${cookies.user._id}`);
          setContacts(data.data);
        }
        fetchData();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [cookies.user, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <>
      {cookies?.user &&
        <div className={style.card}>
          <Sidebar  contacts={contacts} changeChat={handleChatChange} />
          {currentChat === null ? (
            <Welcome currentUser={cookies.user} />
          ) : (
            <ChatContainer currentUser={cookies.user} currentChat={currentChat} socket={socket} />
          )}
        </div>
      }
    </>
  )
}