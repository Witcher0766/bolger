import React, { useEffect, useState } from 'react';
import Post from '../../component/post/Post';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}post`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
     <div className='px-0 md:px-10'>
     {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
     </div>
    </>
  );
};

export default IndexPage;
