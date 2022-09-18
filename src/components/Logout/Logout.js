import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    onLogout();
    navigate('/login');
  }, [navigate, onLogout]);
};

export default Logout;
