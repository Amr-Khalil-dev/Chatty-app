import React, { useState } from "react";

import style from "./ChatInput.module.css";
import { IoMdSend } from "react-icons/io";


export default function ChatInput(props) {
  const [msg, setMsg] = useState("");

  const sendChatHandler = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      props.SendMsgHandler(msg);
      setMsg("");
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={sendChatHandler}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
