import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';
import { CookiesProvider } from "react-cookie";




export default function App() {
  return (
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
  )
}

