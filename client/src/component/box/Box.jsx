import React, { useContext } from 'react'
import styles from './Box.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Box = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);

  console.log(userInfo);

  let username = userInfo?.username;

  function checkfun() {
    
    toast.error("please login/register to create a post")
  }

  return (
    <div className='flex flex-col text-center p-5  mb-8 justify-center md:p-10 md:text-left'>
<div className='flex flex-col justify-center gap-6'>
<h1 className='text-6xl font-semibold md:text-5xl lg:text-6xl'>Blog with <span className='text-sky-400'>the best.</span> </h1>
    <p className='md:text-lg lg:text-lg'>More bloggers and independent creators choose WordPress than any other blogging tool. Tap into intuitive, flexible tools that put writers, bloggers, and creators first.</p>

    {username ? 
     (
      <>
    <div><Link to="/create"  className={styles["btn-box"]}>Start a Blog</Link></div>
      </>
    ) : 
    (
    <div><Link  onClick={checkfun}  className={styles["btn-box"]}>Start a Blog</Link></div>
    )}
</div>
    </div>
  )
}

export default Box