import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuth, name }) => {
  return (
    <div className='header'>
      {' '}
      {isAuth ? (
        <>
          <div className='hEl'>Hello {name}</div>
          <div className='hEl'>
            <Link to='/'>Home</Link>
          </div>
          <div className='hEl'>
            <Link to='/logout'>Logout</Link>
          </div>
        </>
      ) : (
        <>
          <div className='hEl'>
            <Link to='/login'>Login</Link>
          </div>
          <div className='hEl'>
            <Link to='/signup'>Signup</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
