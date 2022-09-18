import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        const emailEl = document.getElementById('email');
        if (!emailEl.classList.contains('inputErr')) {
          emailEl.classList.add('inputErr');
          const divError = document.createElement('div');
          divError.classList.add('errorText');
          const errorText = document.createTextNode(
            'The email has to be valid'
          );
          divError.appendChild(errorText);
          insertAfter(divError, emailEl);
        }
      } else {
        const emailEl = document.getElementById('email');

        emailEl.classList.remove('inputErr');
        const errorText = emailEl.nextSibling;
        if (errorText?.classList.contains('errorText')) {
          errorText.remove();
        }
      }

      if (name.length < 5) {
        const nameEl = document.getElementById('name');
        if (!nameEl.classList.contains('inputErr')) {
          nameEl.classList.add('inputErr');
          const divError = document.createElement('div');
          divError.classList.add('errorText');
          const errorText = document.createTextNode(
            'The name has to be a minimum of 5 characters'
          );
          divError.appendChild(errorText);
          insertAfter(divError, nameEl);
        }
      } else {
        const nameEl = document.getElementById('name');

        nameEl.classList.remove('inputErr');
        const errorText = nameEl.nextSibling;
        if (errorText?.classList.contains('errorText')) {
          errorText.remove();
        }
      }

      if (password.length < 5) {
        const passwordEl = document.getElementById('password');
        if (!passwordEl.classList.contains('inputErr')) {
          passwordEl.classList.add('inputErr');
          const divError = document.createElement('div');
          divError.classList.add('errorText');
          const errorText = document.createTextNode(
            'The password has to be a minimum of 5 characters'
          );
          divError.appendChild(errorText);
          insertAfter(divError, passwordEl);
        }
      } else {
        const passwordEl = document.getElementById('password');

        passwordEl.classList.remove('inputErr');
        const errorText = passwordEl.nextSibling;
        if (errorText?.classList.contains('errorText')) {
          errorText.remove();
        }
      }

      if (name.length >= 5 && password >= 5 && validateEmail(email)) {
        await onSignup(e, { name, email, password });
        navigate('/login');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={e => {
          onSubmit(e);
        }}
      >
        <div className='hint'>Name</div>
        <input
          type='text'
          id='name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className='hint'>Email address</div>
        <input
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className='hint'>Password</div>
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='btn'>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
