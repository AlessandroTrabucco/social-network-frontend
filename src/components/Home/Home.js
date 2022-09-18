import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import './Home.css';
import Modal from '../Modal/Modal';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [logout, setLogout] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const setM = (m, post) => {
    setPost(post);

    setModal(m);
  };

  const editPost = async (event, postData, editPost) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('image', postData.image);

    let url = `${process.env.REACT_APP_server_domain}/feed/post`;
    let method = 'POST';

    if (editPost) {
      url = `${process.env.REACT_APP_server_domain}/feed/post/${postData._id}`;
      method = 'PUT';

      if (!postData.image) {
        formData.delete('image');
        formData.append('image', postData.imageUrl);
      }
    }

    const res = await fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });

    if (res.status !== 201 && res.status !== 200) {
      throw new Error('errore');
    }

    const data = await res.json();

    if (editPost) {
      const postIdx = posts.findIndex(post => post._id === data.post._id);
      const ps = [...posts];
      ps[postIdx] = data.post;

      setPosts([...ps]);
    } else {
      setPosts([{ ...data.post, creator: data.creator }, ...posts]);
    }
  };

  const deletePost = async postId => {
    const jwt = localStorage.getItem('jwt');

    let url = `${process.env.REACT_APP_server_domain}/feed/post/${postId}`;
    let method = 'DELETE';

    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });

    if (res.status === 401) {
      navigate('/logout');
    }

    if (res.status !== 200) {
      const message = await res.json();

      throw new Error(message.message);
    }

    setPosts(posts.filter(post => post._id !== postId));
  };

  useEffect(() => {
    const fetchPosts = async jwt => {
      const res = await fetch(
        `${process.env.REACT_APP_server_domain}/feed/posts`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (res.status !== 200) {
        throw new Error(await res.json().message);
      }

      const data = await res.json();

      setPosts(data.posts);
    };

    const jwt = localStorage.getItem('jwt');

    fetchPosts(jwt).catch(err => {
      setLogout(true);
    });
  }, []);

  return !logout ? (
    <div>
      {modal ? <Modal post={post} setModal={setM} onAddPost={editPost} /> : ''}
      <div id='newPost'>
        <button className='btn newPost' onClick={() => setModal(true)}>
          New Post
        </button>
      </div>
      <Posts setModal={setM} posts={posts} onDelete={deletePost} />
    </div>
  ) : (
    <Navigate to={'/logout'} />
  );
};

export default Home;
