import React from 'react';
import './Message.css';

const Message = ({ message: { message, createdAt }, otherMessage }) => {
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString();

  return (
    <div className={otherMessage ? 'other_msg' : 'my_msg'}>
      <div className={otherMessage ? 'o_msg' : 'msg'}>
        {message}
        <div id={otherMessage ? 'o_date' : 'date'}>{`${date} ${`${
          time.split(':')[0]
        }:${time.split(':')[1]}`}`}</div>
      </div>
    </div>
  );
};

export default Message;
