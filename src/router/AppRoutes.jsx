import React from 'react'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import { Home } from '../components/Home'
import { BookList } from '../components/BookList'
import { Login } from '../components/Login'
import SignUp from '../components/SingUp'
import { BookLoans } from '../components/BookLoans'

const token = localStorage.getItem('accessToken');

export const AppRoutes = () => {
  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loans" element={<BookLoans />} />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
