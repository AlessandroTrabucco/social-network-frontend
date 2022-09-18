import React, { useState, useContext } from 'react';
import './Post.css';
import { FaEdit, FaTrash, FaFacebookMessenger } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SocketContext, socket } from '../../context/socket';

const Post = ({ post, onDelete, setModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const uId = localStorage.getItem('uId');

  return (
    <div className='post'>
      <div className='name'>
        <div>{post.creator.name}</div>
        {post.creator._id !== uId ? (
          <SocketContext.Provider value={socket}>
            <Link to='/messages' state={post.creator._id}>
              <FaFacebookMessenger size={23} color='black' />
            </Link>
          </SocketContext.Provider>
        ) : (
          ''
        )}
      </div>

      <div className='titleContainer'>
        <div className='title'>{post.title}</div>
        <div>
          {post.creator._id === uId ? (
            <FaEdit
              size={27}
              onClick={async () => {
                setModal(true, post);
              }}
            />
          ) : (
            ''
          )}
          {post.creator._id === uId ? (
            <FaTrash
              id='trash'
              color='red'
              size={23}
              onClick={async () => {
                if (!isLoading) {
                  try {
                    setIsLoading(true);
                    await onDelete(post._id);
                    setIsLoading(false);
                  } catch (err) {
                    alert(err.message);
                  }
                }
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>

      <div className='img'>
        <img
          src={`${process.env.REACT_APP_server_domain}/${post.imageUrl}`}
          alt=''
        ></img>
      </div>
      <div className='content'>{post.content}</div>
      <div className='date'>
        Posted on {new Date(post.createdAt).toDateString()}
      </div>
    </div>
  );
};

export default Post;
