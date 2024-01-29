import axios from 'axios';
import jwt_decode from 'jwt-decode';

const BASE_URL = '';

const instance = axios.create({
  baseURL: BASE_URL,
});

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

const register = async (userInfo) => {
  try {
    const formData = new FormData();
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }

    const response = await instance.post("/auth/register", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    storeToken(response.data.token);
    console.log('Registration successful:', response.data);
    window.location.href = '/src/login';

    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);

  }
};

const login = async (userInfo) => {
  try {
    const response = await instance.post("/auth/login", userInfo);
    storeToken(response.data.token);
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};

const me = async () => {
  try {
    const response = await instance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user information:', error.response.data);
  }
};

const getAllUsers = async () => {
  try {
    const response = await instance.get("/auth/users");
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all users:', error.response.data);
  }
};

export { login, register, me, getAllUsers, checkToken, logout };
