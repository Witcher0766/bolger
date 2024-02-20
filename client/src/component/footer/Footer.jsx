import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    const date = new Date()
const year = date.getFullYear()
  return (
   <>
    <footer className='flex h-20 flex-col text-center align-middle justify-center link-footer'>
    <div className='font-medium text-lg flex gap-3 justify-center link-footer'>
        <Link to="https://react-project-7ceac.web.app/" target='_blank'>
            About
        </Link>
        <Link to="https://react-project-7ceac.web.app/contact" target='_blank'>ContactUs</Link>
    </div>
    &copy; {year} All Rights Reserved
    </footer>
   </>
  )
}

export default Footer