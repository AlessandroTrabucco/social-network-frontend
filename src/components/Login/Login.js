import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form
        onSubmit={async e => {
          try {
            await onLogin(e, { email, password });
          } catch (err) {
            document.getElementById('error').style.visibility = 'visible';
          }
        }}
      >
        <div className='hint'>Email address</div>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <div className='hint'>Password</div>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div
          id='error'
          style={{ color: 'red', width: 427, visibility: 'hidden' }}
        >
          Wrong Email or password
        </div>
        <button className='btn'>Login</button>

        <div>
          Not a member?
          <Link id='signupLink' to='/signup'>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
