import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Editpost.module.css';
import ReactQuill from 'react-quill';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Editpost = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}post/${id}`)
    .then(response => {
      response.json().then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
    })
  }, []);

 async function updatePost (e) {
  e.preventDefault();
  const data = new FormData();
  data.set('title', title);
  data.set('summary', summary);
  data.set('content', content);
  data.set('id', id);
  if (files?.[0]) {
      data.set('file', files?.[0]);
  }
   const response = await fetch(`${process.env.REACT_APP_SERVER_URL}post`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
              navigate(`/post/${id}`);
              toast.success("post is edited")
          } else {
            toast.error("Failed to edit post:")
              // console.error('Failed to update post:', response.status, response.statusText);
          }

  }

  return (
    <>
    <div className={styles["post"]}>
        <form onSubmit={updatePost}>
            <input 
            type="title" 
             placeholder={'Title'}   
             value={title}
             onChange={e => setTitle(e.target.value)}
            />
            <input 
            type="summary"
            placeholder={'Summary'}
            value={summary}
            onChange={e => setSummary(e.target.value)}
             />
            <input 
            type="file" 
            // value={files}
             onChange={e => setFiles(e.target.files)}   
            />
            <ReactQuill 
            value={content} 
            className={styles["tupe"]} 
            theme="snow"
            onChange={setContent} 
            />
            <button className='btn'>Update post</button>
        </form>
        </div>
    </>
  )
}

export default Editpost