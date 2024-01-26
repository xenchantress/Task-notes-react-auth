import React, { useState } from 'react';
import { useMutation } from 'react-query';
import authApi from '../api/auth';

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
    password: '',
    picture: '',
});

const registerMutation = useMutation(authApi.register);

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    await registerMutation.mutateAsync(userInfo);
    console.log('Registration successful');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
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
        <label>
            picture:
            <input
            type="file"
            accept="image/*"
            onChange={(e) => setUserInfo({ ...userInfo, avatar: e.target.files[0] })}
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;