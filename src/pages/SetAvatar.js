import React, { useEffect, useState } from "react";
import style from "./SetAvatar.module.css"
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { useCookies } from 'react-cookie';

import avatar1 from "../assets/1.svg";
import avatar2 from "../assets/2.svg";
import avatar3 from "../assets/3.svg";
import avatar4 from "../assets/4.svg";



export default function SetAvatar() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const avatarsIcons = [avatar1, avatar2, avatar3, avatar4];
  const [selectedAvatar, setSelectedAvatar] = useState();

  useEffect(() => {
    if (!cookies.user) {
      navigate("/")
    }
  }, [cookies, navigate]);

  const setProfilePicture = async () => {

    const user = await cookies.user;

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      avatarImage: avatarsIcons[selectedAvatar],
    })

    if (data.status === true) {
      user.isAvatarImageSet = true;
      user.avatarImage = avatarsIcons[selectedAvatar];
      setCookie('user', user, { path: '/' });
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.");
    }
  };


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        theme="dark"
        limit={1}
      />

      <div className={style.container}>
        <h1>Pick an Avatar as your profile picture</h1>
        <div className={style.avatars}>
          {avatarsIcons.map((avatar, index) => {
            return (
              <div
                key={avatar}
                className={selectedAvatar === index ? style.avatarActive : style.avatar}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} disabled={selectedAvatar >= 0 ? false : true} >
          Set as Profile Picture
        </button>
      </div>
    </>
  );
}






