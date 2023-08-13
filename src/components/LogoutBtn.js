import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import style from "./LogoutBtn.module.css";
import { useCookies } from 'react-cookie';


export default function LogoutBtn() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['user']);

  const logoutHandler = () => {
    removeCookie('user', { path: '/' });
    navigate("/login");
  };

  return (
    <button className={style.btn} onClick={logoutHandler}>
      <BiPowerOff />
    </button>
  );
}

