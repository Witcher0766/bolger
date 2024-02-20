import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom'
import {format} from "date-fns";
import Truncated from '../truncated/Truncated';


const Post = ({_id, title, summary, cover, content, author, createdAt}) => {
  return (
    <>
    <div className={styles["blog-data"]}>
      <div className={styles["blog-image"]}>
      <img src={`${process.env.REACT_APP_SERVER_URL}${cover}`} alt=""/>
      </div>
      <div className={styles["blog-content"]}>
     <div className='flex flex-col gap-1 '>
     <Link className={styles["link-hover"]} to={`/post/${_id}`}>
      <h1 className='text-4xl font-semibold'>{title}</h1>
      </Link>
      <p className='text-base text-gray-400'>{summary}</p>
     </div>
     <Truncated paragraph={content} maxLength={300} />
     <div className='flex justify-between w-full px-5'>
      <p className='font-medium'>
      <Link  to="/">{author.username}</Link>
      </p>
      <time className='text-gray-400'>{format(new Date (createdAt), 'MMM d, yyyy HH:mm')}</time>
     </div>
      </div>
      </div>
    </>
  )
}

export default Post