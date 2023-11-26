import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home'
import { BookList } from '../components/BookList'
import { Login } from '../components/Login'
import SignUp from '../components/SingUp'
import { BookLoans } from '../components/BookLoans'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/books" element={<BookList/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/singup" element={<SignUp/>} />
            <Route path="/loans" element={<BookLoans/>} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>
  )
}
