import React, { useEffect } from "react";
import style from "./Login.module.css"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';


import { loginRoute } from "../utils/APIRoutes";
import Logo from "../assets/logo2.png";
import { FiAlertCircle } from 'react-icons/fi';


export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (cookies.user) {
      navigate("/")
    }
  }, [cookies,navigate]);

  const { handleSubmit, register, formState: { errors }, } = useForm();

  const submitHandler = async ({ email, password }) => {
    const { data } = await axios.post(loginRoute, {
      email,
      password
    });

    if (data.status === false) {
      toast.error(data.msg);
    }

    if (data.status === true) {
      return (
        setCookie('user', data.user, { path: '/' })
        )
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

      <form className={style.form} action="" onSubmit={handleSubmit(submitHandler)}>
        <img className={style.brand} src={Logo} alt="logo" />
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i, message: 'Please enter valid email' }
            })}
          />
          {errors.email && (
            <div className={style.errMsg}><FiAlertCircle /> {errors.email.message}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters required' },
            })}
          />
          {errors.password && (
            <div className={style.errMsg}><FiAlertCircle /> {errors.password.message}</div>
          )}
        </div>
        <button>login</button>
        <span>
          Don't have an account ? &nbsp;
          <Link to="/register">Register</Link>
        </span>
      </form>
    </>
  );
}