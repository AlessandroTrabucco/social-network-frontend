import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Message from '../Message/Message';
import './Messages.css';
import { SocketContext } from '../../context/socket';

const Messages = () => {
  const bottomRef = useRef(null);
  const { state: receiver } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sender = localStorage.getItem('uId');
  const [socket, setSocket] = useState(useContext(SocketContext));
  const [listener, setListener] = useState(false);

  const executeScroll = () => bottomRef.current.scrollIntoView();

  const sendMessage = async () => {
    const jwt = localStorage.getItem('jwt');
    const sender = localStorage.getItem('uId');
    const res = await fetch(
      `${process.env.REACT_APP_server_domain}/messages/message`,
      {
        method: 'POST',
        body: JSON.stringify({
          message,
          userId1: sender,
          userId2: receiver,
        }),
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.status !== 201) {
      throw new Error(await res.json().message);
    }

    const data = await res.json();

    setMessage(msg => '');

    setMessages(messages => [...messages, data.message]);
  };

  useEffect(() => {
    executeScroll();
  });

  useEffect(() => {
    const fetchMessages = async (jwt, sender) => {
      const res = await fetch(
        `${process.env.REACT_APP_server_domain}/messages/?userId1=${sender}&userId2=${receiver}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setIsLoading(false);

      if (res.status !== 200) {
        throw new Error(await res.json().message);
      }

      const data = await res.json();

      setMessages(messages => data.messages);
    };

    const jwt = localStorage.getItem('jwt');
    const sender = localStorage.getItem('uId');

    if (!isLoading) {
      setIsLoading(true);
      fetchMessages(jwt, sender).catch(err => {});
    }

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }

    // bottomRef.current.scrollIntoView();
  }, []);

  if (messages) {
    if (!listener) {
      setListener(true);

      socket.on('message', message => {
        setMessages(messages => [...messages, message]);
        bottomRef.current?.scrollIntoView();
      });
    }
  }

  return (
    <div id='body'>
      <div className='chatContainer'>
        <div className='chat'>
          {messages
            ? messages.map((message, index) => {
                return (
                  <Message
                    otherMessage={message.userId1 !== sender}
                    key={message._id}
                    message={message}
                  />
                );
              })
            : ''}
          <div id='target' style={{ paddingTop: 80 }} ref={bottomRef}></div>
        </div>
      </div>
      <div id='in'>
        <input
          type='text'
          id='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button id='send' className='btn send' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
