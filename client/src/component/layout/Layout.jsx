import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

const Layout = () => {

  return (
    <>
        <main>
            <Header/>
            <Outlet/>
            <Footer/>
        </main>
    </>
  )
}

export default Layout