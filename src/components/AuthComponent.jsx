import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/auth/authSlice';

const AuthComponent = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email: 'user@example.com', password: 'password123' }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ email: 'newuser@example.com', password: 'password123' }));
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        Login
      </button>
      <button onClick={handleRegister} disabled={loading}>
        Register
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
};

export default AuthComponent;
