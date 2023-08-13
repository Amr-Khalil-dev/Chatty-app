import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { useCookies } from 'react-cookie';

import style from "./ChatContainer.module.css";

import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, socket }) {
  const [cookies] = useCookies(['user']);
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function asyncData() {
      const data = await cookies.user;
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    asyncData();
  }, [cookies.user, currentChat]);

  const SendMsgHandler = async (msg) => {
    const data = cookies.user;
    socket.current.emit("send-msg", {
      from: data._id,
      to: currentChat._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, from) => {
        setArrivalMessage({ fromSelf: false, message: msg, arrivFrom: from });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (currentChat._id === arrivalMessage?.arrivFrom) {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]); //check if msg is from currnet chat first !!!

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <>
      {currentChat &&
        <div className={style.container} >
          <div className={style.contact}>
            <img
              src={currentChat.avatarImage}
              alt=""
            />
            <p>{currentChat.name}</p>
          </div>
          { }
          <div className={style.messagesContainer}>
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  ref={scrollRef}
                  className={message.fromSelf ? style.msgSended : style.msgRecieved}
                >
                  <div className={style.content}>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput SendMsgHandler={SendMsgHandler} />
        </div>
      }
    </>
  );
}


