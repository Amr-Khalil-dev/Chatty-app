import React, { useEffect } from "react";
import style from "./Login.module.css"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { registerRoute } from "../utils/APIRoutes";
import Logo from "../assets/logo2.png";
import { FiAlertCircle } from 'react-icons/fi';
import { useCookies } from 'react-cookie';


export default function Register() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);


  useEffect(() => {
    if (cookies.user) {
      navigate("/")
    }
  }, [cookies, navigate]);

  const { handleSubmit, register, getValues, formState: { errors }, } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    const { data } = await axios.post(registerRoute, {
      name,
      email,
      password,
    });

    if (data.status === false) {
      toast.error(data.msg);
    }

    if (data.status === true) {
      setCookie('user', data.user, { path: '/' });
      navigate("/setAvatar");
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
            type="text"
            placeholder="Username"
            id="name"
            {...register('name', { required: 'Please enter your name' })}
          />
          {errors.name && (
            <div className={style.errMsg}><FiAlertCircle /> {errors.name.message}</div>
          )}
        </div>

        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Please enter your email',
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
              required: 'Please enter your password',
              minLength: { value: 6, message: 'Minimum 6 characters required' },
            })}
          />
          {errors.password && (
            <div className={style.errMsg}><FiAlertCircle /> {errors.password.message}</div>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password')
            })}
          />
          {errors.confirmPassword && (
            <div className={style.errMsg}> <FiAlertCircle /> Password do not match</div>
          )}
        </div>

        <button>Create User</button>

        <span>
          Already have an account ? &nbsp;
          <Link to="/login">Login</Link>
        </span>
      </form>
    </>
  );
}








