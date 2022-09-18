import './App.css';
import Header from './components/Header/Header';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';
import Messages from './components/Messages/Messages';
import { useState } from 'react';
import { SocketContext, socket } from './context/socket';

const App = () => {
  const [name, setName] = useState(localStorage.getItem('name'));

  const useForceUpdate = () => {
    const [, setValue] = useState(0);
    return () => setValue(value => value + 1);
  };

  const forceUpdate = useForceUpdate();

  const hasJWT = () => {
    return Boolean(localStorage.getItem('jwt'));
  };

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_server_domain}/auth/signup`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
            name: authData.name,
          }),
        }
      );

      if (res.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating a user failed!');
      }
      const resData = await res.json();
    } catch (err) {
      throw err;
    }
  };

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_server_domain}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
          }),
        }
      );

      if (res.status === 422) {
        throw new Error('Validation failed!');
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Log in failed!');
      }
      const resData = await res.json();

      const token = resData.token;

      localStorage.setItem('jwt', token);
      localStorage.setItem('uId', resData.userId);
      localStorage.setItem('name', resData.name);
      setName(resData.name);
      forceUpdate();
    } catch (err) {
      throw err;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('jwt');
    forceUpdate();
  };

  return (
    <SocketContext.Provider value={socket(hasJWT())}>
      <BrowserRouter>
        <div className='container'>
          <Header name={name} isAuth={hasJWT()} />
          <Routes>
            <Route
              path='/'
              element={hasJWT() ? <Home /> : <Navigate to='/login' />}
            />

            <Route
              path='/messages'
              element={hasJWT() ? <Messages /> : <Navigate to='/login' />}
            />
            <Route
              path='/logout'
              element={
                hasJWT() ? (
                  <Logout onLogout={logoutHandler} />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/login'
              element={
                hasJWT() ? (
                  <Navigate to='/' />
                ) : (
                  <Login onLogin={loginHandler} />
                )
              }
            />
            <Route
              path='/signup'
              element={
                hasJWT() ? (
                  <Navigate to='/' />
                ) : (
                  <Signup onSignup={signupHandler} />
                )
              }
            />
            <Route
              path='*'
              element={
                hasJWT() ? <Navigate to='/' /> : <Navigate to='/login' />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};

export default App;
