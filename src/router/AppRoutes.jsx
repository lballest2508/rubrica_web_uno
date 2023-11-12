import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home'
import { BookList } from '../components/BookList'
import { Login } from '../components/Login'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/books" element={<BookList/>} />
            <Route path="/login" element={<Login/>} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>
  )
}
