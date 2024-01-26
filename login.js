import React, { useState } from 'react';
import { useMutation } from 'react-query';
import authApi from '../api/auth';

const Login = () => {
    const [userInfo, setUserInfo] = useState({


        username: '',
        password: '',

    });

    const loginMutation = useMutation(authApi.login);
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginMutation.mutateAsync(userInfo);
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;